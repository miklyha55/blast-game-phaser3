import * as Phaser from 'phaser';

import { IROComponentCfg } from './types';

export class Component {
    name: string;
    container: Phaser.GameObjects.Container;
    parent: Phaser.GameObjects.Container;
    
    protected scene: Phaser.Scene;

    constructor(props: IROComponentCfg) {
        this.name = props.name;
        this.scene = props.scene;
        this.container = props.scene.add.container(0, 0);
    }

    remove() {}

    onRemove() {}
    onCreate() {}
}
