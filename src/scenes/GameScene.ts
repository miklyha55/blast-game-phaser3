import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { GridManager } from '../managers/grid/GridManager';

export default class GameScene extends Phaser.Scene {
    gridManager: GridManager;

    constructor() {
        super(SCENE_NAMES.GameScene);
    }

    create(context: IROContextCfg) {
        this.gridManager = new GridManager(context, context.jsonGame.grid);
    }
}
