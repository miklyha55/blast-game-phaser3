import * as Phaser from 'phaser';

import GameScene from '../scenes/GameScene';
import HudScene from '../scenes/HudScene';

import { RESOLUTION } from './constants';
import LoaderScene from '../scenes/LoaderScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: RESOLUTION.width,
    height: RESOLUTION.height,
    scene: [
        LoaderScene,
        GameScene,
        HudScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const game = new Phaser.Game(config);
