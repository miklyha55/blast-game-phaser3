import * as Phaser from 'phaser';

import { inputCatcher } from "../inputCatcher";

export class JoystickCommand extends inputCatcher {
    private isPressed: boolean;

    constructor(container: Phaser.GameObjects.Container) {
        super(container);
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
