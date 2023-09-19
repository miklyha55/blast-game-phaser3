import * as Phaser from 'phaser';

import { Component } from "../../../components/core/Component";
import { IROContextCfg } from '../../../scenes/types';

export interface IROGameObjectCfg {
    readonly name: string;
    readonly scene: Phaser.Scene;
    readonly conponents: Array<Component>;
    readonly renderLayer: Phaser.GameObjects.Container;
    readonly context: IROContextCfg;
}
