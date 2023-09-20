import * as Phaser from 'phaser';

import { IROGridCfg, IROMoveCellCfg } from "./types";
import { ICellVec2, IVec2 } from '../../utils/types';
import { IROContextCfg } from '../../scenes/types';
import { Cell } from './Cell';
import { COMPONENT_EVENTS } from '../../components/core/events';
import { RENDER_LAYERS_NAME } from '../render/constants';
import { Bg } from './Bg';

export class GridManager {
    cellsContainer: Phaser.GameObjects.Container;
    bgContainer: Phaser.GameObjects.Container;

    private readonly props: IROGridCfg;
    private readonly context: IROContextCfg;
    private readonly cells: Cell[];

    private compareCells: Cell[];
    private maskShape: Phaser.GameObjects.Graphics;

    constructor(context: IROContextCfg, props: IROGridCfg) {
        this.props = props;
        this.context = context;
        this.cells = [];

        console.log(props)

        this.cellsContainer = this.context.scenes.gameScene.add.container(0, 0);
        this.bgContainer = this.context.scenes.gameScene.add.container(0, 0);

        this.setPositions();
        this.createMask();
        this.createGrid();
    }

    async compareCell(cell: Cell) {
        this.compareCells = [];
        this.loopCompare(cell);

        if(this.compareCells.length > this.context.jsonGame.minCompareCount) {
            this.toggleCellInput(false);

            this.removeCompare();
            await this.moveCell();
            this.fillGrid();

            if(this.checkFinal()) {
                this.shuffleCell();
            }

            this.toggleCellInput(true);
        }
    }

    private setPositions() {
        console.log(this.props);
        const { width: gameWidth, height: gameHeidth } = this.context.scenes.gameScene.sys.game.canvas;
        const height: number = this.props.row * this.props.size;
        const width: number = this.props.col * this.props.size;
        const offsetX: number = -400;

        const bg: Bg = new Bg({context: this.context});

        this.cellsContainer.setPosition((gameWidth / 2) - width / 2 + offsetX, (gameHeidth / 2) - (height + height / 2));
        this.bgContainer.setPosition((gameWidth / 2) + offsetX, this.cellsContainer.y + height + height / 2);
        this.bgContainer.setScale(0.75, 0.8);
        this.bgContainer.add(bg.gameObject.container);
        this.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Bg)?.add(this.bgContainer);
    }

    private createMask() {
        this.maskShape = this.context.scenes.gameScene.make.graphics();
        this.maskShape.fillStyle(0xffffff, 1);
        this.maskShape.fillRect(this.cellsContainer.x, this.cellsContainer.y + this.props.row * this.props.size, this.props.col * this.props.size, this.props.row * this.props.size);
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

        for (let index = 0; index < this.cells.length; index++) {
            const cell = this.cells[index];

            this.compareCells = [];
            this.loopCompare(cell);

            if(this.compareCells.length > this.context.jsonGame.minCompareCount) {
                isFinal = false;
                break;
            }
        }

        return isFinal;
    }

    private toggleCellInput(active: boolean) {
        const foo: string = active ? "setEvents" : "removeEvents";

        this.cells.forEach(cell => {
            cell.cellCommand[foo]();
        });
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

    private removeCompare() {
        this.compareCells.forEach(cell => {
            cell.remove();
        });
    }

    private loopCompare(cellCompare: Cell) {
        if(this.compareCells.includes(cellCompare)) {
            return;
        }

        this.compareCells.push(cellCompare);

        const leftCell: Cell =
            this.cells.find((cell) => cell.col === cellCompare.col - 1 && cell.row === cellCompare.row);
        const rightCell: Cell =
            this.cells.find((cell) => cell.col === cellCompare.col + 1 && cell.row === cellCompare.row);
        const topCell: Cell =
            this.cells.find((cell) => cell.col === cellCompare.col && cell.row === cellCompare.row - 1);
        const bottomCell: Cell =
            this.cells.find((cell) => cell.col === cellCompare.col && cell.row === cellCompare.row + 1);

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
        this.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Blocks)?.add(this.cellsContainer);
    }
}
