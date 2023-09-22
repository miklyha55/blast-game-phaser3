import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { ScorePanel } from '../ui/ScorePanel';
import { ButtonReset } from '../ui/ButtonReset';
import { CompletePopup } from '../ui/CompletePopup';
import { COMPONENT_EVENTS } from '../components/core/events';
import { ButtonBomb } from '../ui/ButtonBomb';
import { ButtonTeleport } from '../ui/ButtonTeleport';

export default class HudScene extends Phaser.Scene {
    scorePanel: ScorePanel;
    completePopup: CompletePopup;
    buttonBomb: ButtonBomb;
    buttonTeleport: ButtonTeleport;

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
    }
}
