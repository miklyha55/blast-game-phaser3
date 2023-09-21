import * as Phaser from 'phaser';

import { InputCatcher } from "../InputCatcher";
import { IROContextCfg } from '../../../scenes/types';
import { Cell } from '../../../managers/grid/Cell';

export class BombCommand extends InputCatcher {
    private isPressed: boolean;
    private cell: Cell;

    constructor(cell: Cell, context: IROContextCfg) {
        super(context.scenes.gameScene, context);

        this.cell = cell;
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;

        this.context.scenes.gameScene.gridManager.bombBuster.boom(this.cell);
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
