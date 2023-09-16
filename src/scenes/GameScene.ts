import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super(SCENE_NAMES.GameScene);
    }

    create(context: IROContextCfg) {
        console.log(SCENE_NAMES.GameScene, context);
    }
}
