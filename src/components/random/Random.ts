import * as Phaser from 'phaser';

import { IROComponentCfg } from '../core/types';
import { Component } from '../core/Component';
import { COMPONENT_EVENTS } from '../core/events';
import { COLORS_BLOCK } from './constants';

export class Random extends Component
{
    constructor(props: IROComponentCfg) {
        super(props);
    }

    override onCreate() {
        this.parent.on(COMPONENT_EVENTS.ADD_RANDOM, this.onRandom, this);
    }

    override onRemove() {
        this.parent.off(COMPONENT_EVENTS.ADD_RANDOM, this.onRandom, this);
    }

    private onRandom() {
        const keys = Object.keys(COLORS_BLOCK);
        const rand: number = Phaser.Math.Between(0, keys.length - 1);

        this.parent.emit(COMPONENT_EVENTS.SET_TEXTURE, COLORS_BLOCK[keys[rand]]);
    }
}
