import * as Phaser from 'phaser';

import { RENDER_LAYERS } from "./constants";
import { Factory } from "./factory";

export class RenderManager
{
    private readonly layers: Array<Phaser.GameObjects.Container>;

    constructor(scene: Phaser.Scene) {
        this.layers = Factory.CreateLayers(scene, RENDER_LAYERS);
    }

    getLayerByName(name: string) {
        return this.layers.find((layer) => layer.name === name);
    }
}
