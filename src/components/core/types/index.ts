import * as Phaser from 'phaser';

export interface IROComponentCfg {
    readonly name: string;
    readonly scene: Phaser.Scene;
    readonly parent: Phaser.GameObjects.Container;
}
