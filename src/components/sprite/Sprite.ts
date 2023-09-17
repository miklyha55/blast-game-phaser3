import * as Phaser from 'phaser';

import { Component } from '../core/Component';
import { IROSpriteCfg } from './types';
import { COMPONENT_EVENTS } from '../core/events';

export class Sprite extends Component
{
    sprite: Phaser.GameObjects.Sprite;

    constructor(props: IROSpriteCfg) {
        super(props, props.scene.add.container(0, 0));

        this.sprite = props.scene.add.sprite(0, 0, props.texture);
        this.container.add(this.sprite);

        this.setEvents();
    }

    private setEvents() {
        this.container.on(COMPONENT_EVENTS.SET_TEXTURE, this.onSetTexture.bind(this));
    }

    private onSetTexture(key: string) {
        this.sprite.setTexture(key);
    }
}
