import { Component } from "../../../components/core/Component";
import { IROContextCfg } from "../../../scenes/types";

export interface IROGameObjectCfg {
    readonly name: string;
    readonly scene: Phaser.Scene;
    readonly conponents: Array<Component>;
    readonly renderType: string;
    readonly context: IROContextCfg;
}

export interface GameObjectClassType { new(props: IROGameObjectCfg) }
