import { GameObject } from '../gameObject/GameObject';
import { IROContextCfg } from '../../scenes/types';
import { Sprite } from '../../components/sprite/Sprite';
import { RENDER_LAYERS_NAME } from '../render/constants';
import { ASSETS_NAME } from '../../configs/assets/Assets';
import { JoystickCommand } from '../../inputs/commands/JoystickCommand';

export class Cell extends GameObject {
    constructor(context: IROContextCfg) {
        super({
            name: "Cell",
            scene: context.scenes.gameScene,
            renderLayer: context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Blocks),
            conponents: [
                new Sprite({
                    name: "Sprite",
                    scene: context.scenes.gameScene,
                    texture: ASSETS_NAME.BlueBlock,
                    origin: {x: 0.5, y: 0.5},
                })
            ],
        })
    }

    override onCreate() {
        new JoystickCommand(this.container);
    }
}
