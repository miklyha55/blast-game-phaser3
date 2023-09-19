import * as Phaser from 'phaser';

import { IROGridCfg } from "./types";
import { IVec2 } from '../../utils/types';
import { Cell } from './Cell';
import { IROContextCfg } from '../../scenes/types';

export class GridManager {
    private readonly props: IROGridCfg;
    private readonly context: IROContextCfg;
    private readonly container: Phaser.GameObjects.Container;
    private readonly cells: Cell[];

    private compareCells: Cell[];

    constructor(context: IROContextCfg, props: IROGridCfg) {
        this.props = props;
        this.context = context;
        this.container = this.context.scenes.gameScene.add.container(0, 0);
        this.cells = [];

        this.createGrid();
    }

    compareCell(cell: Cell) {
        this.compareCells = [];
        this.loopCompare(cell);

        if(this.compareCells.length > 2) {
            this.removeCompare();
        }
    }

    private removeCompare() {
        this.compareCells.forEach(cell => {
            cell.gameObject.remove();
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
        let index: number = 0;

        for (let col = 0; col < this.props.col; col++) {
            for (let row = 0; row < this.props.row; row++) {
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

                cell.gameObject.container.setPosition(position.x, position.y);
                index++;
            }
        }
    }
}
