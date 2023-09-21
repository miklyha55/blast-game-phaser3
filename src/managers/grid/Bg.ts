import { Resize } from '../../components/resize/Resize';
import { Sprite } from '../../components/sprite/Sprite';
import { ASSETS_NAME } from '../../configs/assets/Assets';
import { GameObject } from '../gameObject/GameObject';
import { IROPrefabCfg } from '../gameObject/types';
import { RENDER_LAYERS_NAME } from '../render/constants';

export class Bg {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        const { width: gameWidth, height: gameHeidth }
            = props.context.scenes.gameScene.sys.game.canvas;
        const height: number =
            props.context.jsonGame.grid.row *  props.context.jsonGame.grid.size;
        const width: number =
            props.context.jsonGame.grid.col *  props.context.jsonGame.grid.size;

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
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        position: {
                            x: gameWidth / 2 - 400,
                            y: gameHeidth / 2
                        },
                        scale: {
                            x: 0.75,
                            y: 0.8,
                        },
                    })
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Bg),
            }
        )
    }
}
