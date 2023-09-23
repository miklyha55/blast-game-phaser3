import * as Phaser from 'phaser';

import { IROBusterCommandCfg } from '../../../../busters/core/types';
import { BusterCommand } from './core/BusterCommand';

export class TeleportCommand extends BusterCommand {
    private isPressed: boolean;

    constructor(props: IROBusterCommandCfg) {
        super(props);
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;

        this.context.scenes.hudScene.teleportBuster.teleport(this.cell);
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
