import * as Phaser from 'phaser';

import GameScene from './GameScene';
import HudScene from './HudScene';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';

import { Assets } from '../configs/assets';

export default class LoaderScene extends Phaser.Scene {
    constructor() {
        super(SCENE_NAMES.LoaderScene);
    }

    async preload() {
        await this.loadResoures();

        const gameScene: GameScene = this.scene.get(SCENE_NAMES.GameScene) as GameScene;
        const hudScene: HudScene = this.scene.get(SCENE_NAMES.HudScene) as HudScene;

        const context: IROContextCfg = {
            scenes: {
                gameScene,
                hudScene,
            },

            jsonGame: this.cache.json.get("game.json"),
        }

        this.scene.launch(SCENE_NAMES.GameScene, context);
        this.scene.launch(SCENE_NAMES.HudScene, context);
    }

    private async loadResoures(): Promise<void> {
        Assets.forEach((element)=> {
            this.load[element.type](element.name, element.path);
        });

        return new Promise((resolve) => {
            this.load.once(Phaser.Loader.Events.COMPLETE, resolve);
        });
    }
}
