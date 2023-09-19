import * as Phaser from 'phaser';

import { IROGridCfg } from "./types";
import { IVec2 } from '../../utils/types';
import { Cell } from './Cell';
import { IROContextCfg } from '../../scenes/types';

export class GridManager {
    private readonly props: IROGridCfg;
    private readonly context: IROContextCfg;
    private readonly container: Phaser.GameObjects.Container;

    constructor(context: IROContextCfg, props: IROGridCfg) {
        this.props = props;
        this.context = context;
        this.container = this.context.scenes.gameScene.add.container(0, 0);

        this.createGrid();
    }

    createGrid() {
        let index: number = 0;

        for (let col = 0; col < this.props.col; col++) {
            for (let row = 0; row < this.props.row; row++) {
                const position: IVec2 = {
                    x: col * this.props.size + this.props.size / 2,
                    y: row * this.props.size + this.props.size / 2,
                }
                const cell: Cell = new Cell(this.context);

                cell.container.setPosition(position.x, position.y);
                index++;
            }
        }
    }
}
