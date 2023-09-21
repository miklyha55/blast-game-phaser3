import * as Phaser from 'phaser';

import { InputCatcher } from "../InputCatcher";
import { IROContextCfg } from '../../../scenes/types';

export class ButtonBombCommand extends InputCatcher {
    private isPressed: boolean;

    constructor(context: IROContextCfg) {
        super(context.scenes.gameScene, context);
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;

        this.context.scenes.gameScene.gridManager.bombBuster.setBombCommand();
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
