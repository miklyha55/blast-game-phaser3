import { Resize } from '../../components/resize/Resize';
import { GameObject } from '../gameObject/GameObject';
import { IROPrefabCfg } from '../gameObject/types';
import { RENDER_LAYERS_NAME } from '../render/constants';

export class Blocks {
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
                name: "Blocks",
                scene: props.context.scenes.gameScene,
                conponents: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        position: {
                            x: (gameWidth / 2) - width / 2 - 400,
                            y: (gameHeidth / 2) - (height + height / 2),
                        },
                    })
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Blocks),
            }
        )
    }
}
