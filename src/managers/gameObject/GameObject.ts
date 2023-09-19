import * as Phaser from 'phaser';

import { Component } from '../../components/core/Component';
import { IROGameObjectCfg } from './types';

export class GameObject {
    name: string;
    conponents: Array<Component>;
    container: Phaser.GameObjects.Container;

    private scene: Phaser.Scene;
    private renderLayer: Phaser.GameObjects.Container;

    constructor(props: IROGameObjectCfg) {
        this.name = props.name;
        this.scene = props.scene;
        this.conponents = props.conponents;
        this.renderLayer = props.renderLayer;

        this.container = this.scene.add.container(0, 0);

        this.conponents.forEach(component => {
            this.container.add(component.container);
        });

        this.container.setSize(this.container.getBounds().width, this.container.getBounds().height);

        this.renderLayer.add(this.container);
        this.onCreate();
    }

    removeComponentByName(name: string) {
        this.conponents?.forEach((component, index) => {
            if(component.name === name) {
                component.remove();
                this.conponents.splice(index, 1);
            }
        });
    }

    getComponentByName(name: string): Component {
        return this.conponents?.find((component) => component.name === name);
    }

    remove() {}
    onRemove() {}
    onCreate() {}
}
