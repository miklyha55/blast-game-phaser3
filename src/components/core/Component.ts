import * as Phaser from 'phaser';

import { IROComponentCfg } from './types';

export class Component {
    name: string;
    
    protected scene: Phaser.Scene;
    protected parent: Phaser.GameObjects.Container;
    protected container: Phaser.GameObjects.Container;

    constructor(props: IROComponentCfg, container?: Phaser.GameObjects.Container) {
        this.name = props.name;
        this.scene = props.scene;
        this.parent = props.parent;
        this.container = container;
    }

    remove() {
        if(this.container) {
            this.container.destroy();
        }
    }
}
