import * as Phaser from 'phaser';

export class inputCatcher {
    private readonly container: Phaser.GameObjects.Container;

    constructor(container: Phaser.GameObjects.Container) {
        this.container = container;
    
        this.setEvents();
    }

    setEvents() {
        console.log('setEvents')
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
