import * as Phaser from 'phaser';

import { inputCatcher } from "../inputCatcher";
import { IROContextCfg } from '../../scenes/types';
import { Cell } from '../../managers/grid/Cell';

export class CellCommand extends inputCatcher {
    private isPressed: boolean;
    private cell: Cell;

    constructor(cell: Cell, context: IROContextCfg) {
        super(cell.gameObject.container, context);

        this.cell = cell;
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;

        this.context.scenes.gameScene.gridManager.compareCell(this.cell);
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
