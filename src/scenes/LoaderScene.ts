import * as Phaser from 'phaser';

import GameScene from './GameScene';
import HudScene from './HudScene';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';

import { Assets } from '../configs/assets';
import { ASSETS_NAME } from '../configs/assets/Assets';
import { RenderManager } from '../managers/render/RenderManager';
import { RENDER_GAME_LAYERS, RENDER_UI_LAYERS } from '../managers/render/constants';
import { GameObjectManager } from '../managers/gameObject/GameObjectManager';

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

            jsonGame: this.cache.json.get(ASSETS_NAME.GameCfg),
            renderGameManager: new RenderManager(gameScene, RENDER_GAME_LAYERS),
            renderUiManager: new RenderManager(gameScene, RENDER_UI_LAYERS),
            gameObjectManager: new GameObjectManager(),
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
