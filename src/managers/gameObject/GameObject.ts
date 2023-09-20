import * as Phaser from 'phaser';

import { Component } from '../../components/core/Component';
import { IROGameObjectCfg } from './types';
import { IROContextCfg } from '../../scenes/types';

export class GameObject {
    name: string;
    index: number;
    conponents: Array<Component>;
    container: Phaser.GameObjects.Container;

    private scene: Phaser.Scene;
    private renderLayer: Phaser.GameObjects.Container | null;

    protected context: IROContextCfg;

    constructor(props: IROGameObjectCfg) {
        this.name = props.name;
        this.scene = props.scene;
        this.conponents = props.conponents;
        this.renderLayer = props.renderLayer;
        this.context = props.context;

        this.container = this.scene.add.container(0, 0);

        this.conponents.forEach(component => {
            component.parent = this.container;

            if(component.container.list.length) {
                this.container.add(component.container);
            }
            
            component.onCreate();
        });

        this.container.setSize(this.container.getBounds().width, this.container.getBounds().height);
        this.renderLayer?.add(this.container);
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
}
