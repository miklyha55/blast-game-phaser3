import * as Phaser from 'phaser';

import { Component } from '../../components/core/Component';
import { IROGameObjectCfg } from './types';
import { IROContextCfg } from '../../scenes/types';

export class GameObject {
    name: string;

    private scene: Phaser.Scene;
    private conponents: Array<Component>;
    private renderType: string;
    private context: IROContextCfg;

    private container: Phaser.GameObjects.Container;

    construstor(props: IROGameObjectCfg) {
        this.name = props.name;
        this.scene = props.scene;
        this.conponents = props.conponents;
        this.renderType = props.renderType;
        this.context = props.context;
    }

    remove() {
        this.conponents?.forEach(component => {
            component.remove();
        });

        this.conponents = [];
        this.container.destroy();
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
}
