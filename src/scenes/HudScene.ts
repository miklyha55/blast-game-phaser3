import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';

export default class HudScene extends Phaser.Scene {
    constructor() {
        super(SCENE_NAMES.HudScene);
    }

    create(context: IROContextCfg) {}
}
