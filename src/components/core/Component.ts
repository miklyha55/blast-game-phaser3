import * as Phaser from 'phaser';

export class Component {
    name: string;
    
    private scene: Phaser.Scene;
    private parent: Phaser.GameObjects.Container;

    private container: Phaser.GameObjects.Container;

    construstor(name: string, scene: Phaser.Scene, parent: Phaser.GameObjects.Container) {
        this.name = name;
        this.scene = scene;
        this.parent = parent;
    }

    remove() {
        if(this.container) {
            this.container.destroy();
        }
    }
}
