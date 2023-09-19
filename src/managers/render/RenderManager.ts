import * as Phaser from 'phaser';

import { Factory } from "./factory";

export class RenderManager
{
    private readonly layers: Array<Phaser.GameObjects.Container>;

    constructor(scene: Phaser.Scene, renderLayers: string[]) {
        this.layers = Factory.CreateLayers(scene, renderLayers);
    }

    getLayerByName(name: string) {
        return this.layers.find((layer) => layer.name === name);
    }
}
