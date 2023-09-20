import { Sprite } from '../../components/sprite/Sprite';
import { ASSETS_NAME } from '../../configs/assets/Assets';
import { IROBgCfg } from './types';
import { GameObject } from '../gameObject/GameObject';

export class Bg {
    gameObject: GameObject;

    constructor(props: IROBgCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Bg",
                scene: props.context.scenes.gameScene,
                conponents: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.gameScene,
                        texture: ASSETS_NAME.Bg,
                    }),
                ],
                context: props.context,
            }
        )
    }
}
