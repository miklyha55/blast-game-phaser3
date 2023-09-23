import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { ScorePanel } from '../ui/ScorePanel';
import { ButtonReset } from '../ui/ButtonReset';
import { CompletePopup } from '../ui/CompletePopup';
import { COMPONENT_EVENTS } from '../components/core/events';
import { ButtonBomb } from '../ui/ButtonBomb';
import { ButtonTeleport } from '../ui/ButtonTeleport';
import { Bomb } from '../busters/Bomb';
import { Teleport } from '../busters/Teleport';
import { Text } from '../components/text/Text';

export default class HudScene extends Phaser.Scene {
    scorePanel: ScorePanel;
    completePopup: CompletePopup;
    buttonBomb: ButtonBomb;
    buttonTeleport: ButtonTeleport;

    bombBuster: Bomb;
    teleportBuster: Teleport;

    constructor() {
        super(SCENE_NAMES.HudScene);
    }

    create(context: IROContextCfg) {
        this.scorePanel = new ScorePanel({context});

        const buttonReset: ButtonReset = new ButtonReset({context});

        this.completePopup = new CompletePopup({context});
        this.completePopup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false);
        this.completePopup.gameObject.container.add(buttonReset.gameObject.container);

        this.buttonBomb = new ButtonBomb({context});
        this.buttonTeleport = new ButtonTeleport({context});

        this.bombBuster = new Bomb(
            context,
            context.scenes.gameScene.gridManager,
            this.buttonBomb.gameObject.container,
            this.buttonBomb.gameObject.getComponentByName('Points') as Text
        );

        this.teleportBuster = new Teleport(
            context,
            context.scenes.gameScene.gridManager,
            this.buttonTeleport.gameObject.container,
            this.buttonTeleport.gameObject.getComponentByName('Points') as Text
        );
    }
}
