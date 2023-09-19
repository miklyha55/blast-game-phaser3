import * as Phaser from 'phaser';

import { Component } from "../../../components/core/Component";

export interface IROGameObjectCfg {
    readonly name: string;
    readonly scene: Phaser.Scene;
    readonly conponents: Array<Component>;
    readonly renderLayer: Phaser.GameObjects.Container;
}

export interface GameObjectClassType { new(props: IROGameObjectCfg) }
