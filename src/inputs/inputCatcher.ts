import * as Phaser from 'phaser';
import { IROContextCfg } from '../scenes/types';

export class inputCatcher {
    protected readonly container: Phaser.GameObjects.Container;
    protected readonly context: IROContextCfg;

    constructor(container: Phaser.GameObjects.Container, context: IROContextCfg) {
        this.container = container;
        this.context = context;
    
        this.setEvents();
    }

    setEvents() {
        this.container.setInteractive();

        this.container.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
        this.container.on(Phaser.Input.Events.POINTER_UP , this.onPointerUp, this);
        this.container.on(Phaser.Input.Events.POINTER_MOVE , this.onPointerMove, this);
    }

    removeEvents() {
        this.container.removeInteractive();

        this.container.off(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
        this.container.off(Phaser.Input.Events.POINTER_UP , this.onPointerUp, this);
        this.container.off(Phaser.Input.Events.POINTER_MOVE , this.onPointerMove, this);
    }

    protected onPointerDown(pointer: Phaser.Input.Pointer) {}
    protected onPointerUp(pointer: Phaser.Input.Pointer) {}
    protected onPointerMove(pointer: Phaser.Input.Pointer) {}
}
