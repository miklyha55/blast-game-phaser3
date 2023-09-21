import * as Phaser from 'phaser';

import { InputCatcher } from "../InputCatcher";
import { IROContextCfg } from '../../../scenes/types';
import { COMPONENT_EVENTS } from '../../core/events';

export class ButtonResetCommand extends InputCatcher {
    private isPressed: boolean;

    constructor(context: IROContextCfg) {
        super(context.scenes.gameScene, context);
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;

        this.context.scenes.hudScene.
            completePopup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false);
        this.context.scenes.gameScene.gridManager.reset();
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
