import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { GridManager } from '../managers/grid/GridManager';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super(SCENE_NAMES.GameScene);
    }

    create(context: IROContextCfg) {
        console.log(SCENE_NAMES.GameScene, context);

        new GridManager(context, {
            col: 5,
            row: 5,
            size: 180,
        })
    }
}
