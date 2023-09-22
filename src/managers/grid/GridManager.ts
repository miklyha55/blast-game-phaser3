import * as Phaser from 'phaser';

import { IROGridCfg, IROMoveCellCfg } from "./types";
import { ICellVec2, IVec2 } from '../../utils/types';
import { IROContextCfg } from '../../scenes/types';
import { Cell } from './Cell';
import { COMPONENT_EVENTS } from '../../components/core/events';
import { Bg } from './Bg';
import { Blocks } from './Blocks';
import { CompareCommand } from '../../components/input/commands/CompareCommand';
import { Component } from '../../components/core/Component';
import { Text } from '../../components/text/Text';
import { Bomb } from '../../busters/Bomb';
import { CompareEffect } from '../../components/compareEffect/compareEffect';

export class GridManager {
    cellsContainer: Phaser.GameObjects.Container;
    bombBuster: Bomb;
    cells: Cell[];

    private readonly props: IROGridCfg;
    private readonly context: IROContextCfg;

    private shuffleCount: number;
    private pointsCount: number;
    private movesCount: number;
    private winCount: number;
    private compareCells: Cell[];
    private maskShape: Phaser.GameObjects.Graphics;
    private isComplete: boolean;

    constructor(context: IROContextCfg, props: IROGridCfg) {
        this.props = props;
        this.context = context;
        this.cells = [];
        this.shuffleCount = context.jsonGame.shuffleCount;
        this.movesCount = context.jsonGame.movesCount;
        this.winCount = context.jsonGame.winCount;
        this.pointsCount = 0;
        this.isComplete = false;

        this.cellsContainer = new Blocks({ context: this.context }).gameObject.container;
        new Bg({context: this.context}).gameObject.container;

        this.bombBuster = new Bomb(this.context, this);

        this.createMask();
        this.createGrid();
    }

    async compareCell(cell: Cell) {
        this.compareCells = [];
        this.loopCompare(cell);

        if(this.compareCells.length > this.context.jsonGame.minCompareCount) {
            this.movesCount--;

            this.pointsCount += this.compareCells.length;
            this.uiDataUpdate();

            this.toggleCellInput(false);
            await this.removeCompare();
            this.updateCell();
        }
    }

    setPoints(points: number) {
        this.pointsCount += points;
        this.uiDataUpdate();
    }

    reset() {
        this.shuffleCell();
        this.toggleCellInput(true);

        this.context.scenes.hudScene.
            completePopup.gameObject.getComponentByName("WinTitle").container.alpha = 1;
        this.context.scenes.hudScene.
            completePopup.gameObject.getComponentByName("LoseTitle").container.alpha = 1;

        this.isComplete = false;
        this.pointsCount = 0;
        this.shuffleCount = this.context.jsonGame.shuffleCount;
        this.movesCount = this.context.jsonGame.movesCount;
        this.bombBuster.reset();
        
        this.uiDataUpdate();
    }

    toggleCellInput(active: boolean) {
        this.cells.forEach(cell => {
            if(active) {
                const compareCommand: Component = new CompareCommand(
                    cell,
                    this.context,
                ) 
                cell.gameObject.addComponent(compareCommand);
            } else {
                cell.gameObject.getComponentsByName("InpurCatcher").forEach((component) => {
                    component.remove();
                })
            }
        });
    }

    async updateCell() {
        await this.moveCell();
        this.fillGrid();

        if(this.checkFinal()) {
            this.shuffleCell();
            this.shuffleCount--;

            if(this.checkFinal() || !this.shuffleCount) {
                this.lose();
            }
        }

        this.toggleCellInput(true);

        if(this.pointsCount >= this.winCount) {
            this.isComplete = true;
            this.win();
        }

        if(this.movesCount === 0 && !this.isComplete) {
            this.lose();
        }
    }

    private uiDataUpdate() {
        const pointsText: Text =
            this.context.scenes.hudScene
                .scorePanel.gameObject.getComponentByName("Points") as Text;
        const movesText: Text =
            this.context.scenes.hudScene
                .scorePanel.gameObject.getComponentByName("Moves") as Text;

        movesText.setText(this.movesCount + "");
        pointsText.setText(this.pointsCount + "");
    }

    private lose() {
        this.toggleCellInput(false);

        this.context.scenes.hudScene.
            completePopup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, true);
        this.context.scenes.hudScene.
            completePopup.gameObject.getComponentByName("WinTitle").container.alpha = 0;
    }

    private win() {
        this.toggleCellInput(false);

        this.context.scenes.hudScene.
            completePopup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, true);
        this.context.scenes.hudScene.
            completePopup.gameObject.getComponentByName("LoseTitle").container.alpha = 0;
    }

    private createMask() {
        this.maskShape = this.context.scenes.gameScene.make.graphics();
        this.maskShape.fillStyle(0xffffff, 1);
        this.maskShape.fillRect(
            this.cellsContainer.x,
            this.cellsContainer.y + this.props.row * this.props.size,
            this.props.col * this.props.size,
            this.props.row * this.props.size
        );
        const mask: Phaser.Display.Masks.GeometryMask = this.maskShape.createGeometryMask();

        this.cellsContainer.mask = mask;
    }

    private shuffleCell() {
        this.cells.forEach(cell => {
            cell.gameObject.container.emit(COMPONENT_EVENTS.ADD_RANDOM);
        });
    }

    private checkFinal(): boolean {
        let isFinal: boolean = true;
        const screenCells: Cell[] =
            this.cells.filter((cell) => cell.row >= this.context.jsonGame.grid.row);

        for (let index = 0; index < screenCells.length; index++) {
            const cell = screenCells[index];

            this.compareCells = [];
            this.loopCompare(cell);

            if(this.compareCells.length > this.context.jsonGame.minCompareCount) {
                isFinal = false;
                break;
            }
        }

        return isFinal;
    }

    private fillGrid() {
        for (let col = 0; col < this.props.col; col++) {
            for (let row = 0; row < this.props.row * 2; row++) { 
                if(!this.cells.find((cell) => cell.col === col && cell.row === row)) {
                    this.createCell(col, row);
                }
            }
        }
    }

    private moveCell() {
        return new Promise<void>((resolve) => {
            const moveCells: IROMoveCellCfg[] = [];
            const existPositions: ICellVec2[][] = [];
    
            for (let col = 0; col < this.props.col; col++) {
                const existRow: ICellVec2[] = [];
    
                for (let row = 0; row < this.props.row * 2; row++) { 
                    if(!this.cells.find((cell) => cell.col === col && cell.row === row)) {
                        existRow.push({ col, row });
                    }
                }
    
                existPositions.push(existRow);
            }
    
            existPositions.forEach(positions => {
                if(positions.length) {
                    let betweenCells: Cell[] = [];
    
                    positions.forEach((position, index) => {
                        const delataCells: Cell[] = this.cells.filter(
                            (cell) => !betweenCells.includes(cell)
                                && cell.row < position.row && cell.col === position.col
                        );
    
                        betweenCells = betweenCells.concat(delataCells);
    
                        delataCells.forEach(cell => {
                            moveCells.push({step: positions.length - index, cell});
                        });
                    });
                }
            });

            if(!moveCells.length) {
                resolve();
            }
    
            moveCells.forEach(element => {
                const container: Phaser.GameObjects.Container
                    = element.cell.gameObject.container;
    
                this.context.scenes.gameScene.tweens.add({
                    targets: container,
                    y: container.y + this.props.size * element.step,
                    duration: this.context.jsonGame.grid.moveDelay,
                    onComplete: () => {
                        element.cell.row += element.step;
                        resolve();
                    }
                });
            });
        });
    }

    private async removeCompare() {
        return new Promise<void>((resolve) => {
            const propmises: Promise<void>[] = [];

            this.compareCells.forEach(async (cell) => {
                const compareEffect: CompareEffect
                    = cell.gameObject.getComponentByName("CompareEffect") as CompareEffect;
                const promise: Promise<void> = compareEffect?.start();

                promise && propmises.push(promise);
                await promise;
                cell.remove();
            });

            Promise.all([...propmises]).then(() => {
                resolve();
            });
        });
    }

    private loopCompare(cellCompare: Cell) {
        const screenCells: Cell[] =
            this.cells.filter((cell) => cell.row >= this.context.jsonGame.grid.row);

        if(this.compareCells.includes(cellCompare)) {
            return;
        }

        this.compareCells.push(cellCompare);

        const leftCell: Cell =
            screenCells.find((cell) => cell.col === cellCompare.col - 1 && cell.row === cellCompare.row);
        const rightCell: Cell =
            screenCells.find((cell) => cell.col === cellCompare.col + 1 && cell.row === cellCompare.row);
        const topCell: Cell =
            screenCells.find((cell) => cell.col === cellCompare.col && cell.row === cellCompare.row - 1);
        const bottomCell: Cell =
            screenCells.find((cell) => cell.col === cellCompare.col && cell.row === cellCompare.row + 1);

        if(leftCell != null && cellCompare.color === leftCell.color) {
            this.loopCompare(leftCell);
        }

        if(rightCell != null && cellCompare.color === rightCell.color) {
            this.loopCompare(rightCell);
        }

        if(topCell != null && cellCompare.color === topCell.color) {
            this.loopCompare(topCell);
        }

        if(bottomCell != null && cellCompare.color === bottomCell.color) {
            this.loopCompare(bottomCell);
        }
    }

    private createGrid() {
        for (let col = 0; col < this.props.col; col++) {
            for (let row = 0; row < this.props.row * 2; row++) {
                this.createCell(col, row);
            }
        }
    }

    private createCell(col: number, row: number) {
        const position: IVec2 = {
            x: col * this.props.size + this.props.size / 2,
            y: row * this.props.size + this.props.size / 2,
        }

        const cell: Cell = new Cell({
            row,
            col,
            context: this.context,
        });

        this.cells.push(cell);

        cell.remove = () => {
            cell.gameObject.remove();

            this.cells.forEach((cellCompare, index) => {
                if(cell.col === cellCompare.col && cell.row === cellCompare.row) {
                    this.cells.splice(index, 1);
                }
            });
        }
        this.cellsContainer.add(cell.gameObject.container);
        cell.gameObject.container.setPosition(position.x, position.y);
    }
}
