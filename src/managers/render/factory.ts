import * as Phaser from 'phaser';

export class Factory {
    static CreateLayers(scene: Phaser.Scene, layerKeys: Array<string>) {
        const layers: Array<Phaser.GameObjects.Container> = [];

        layerKeys.forEach(key => {
            const layer: Phaser.GameObjects.Container = scene.add.container(0, 0);

            layer.name = key;
            layers.push(layer);
        });

        return layers;
    }
}
