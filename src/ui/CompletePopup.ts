import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { Text } from "../components/text/Text";
import { Toggle } from "../components/toggle/Toggle";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class CompletePopup {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        const { width: gameWidth, height: gameHeidth }
            = props.context.scenes.gameScene.sys.game.canvas;

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CompletePopup",
                scene: props.context.scenes.hudScene,
                conponents: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.hudScene,
                        texture: ASSETS_NAME.Bg,
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        position: {
                            x: gameWidth / 2,
                            y: gameHeidth / 2,
                        },
                        scale: {
                            x: 0.7,
                            y: 0.7,
                        }
                    }),
                    new Text({
                        name: "LoseTitle",
                        scene: props.context.scenes.hudScene,
                        text: "Ты проиграл!",
                        size: 200,
                        position: {
                            x: 0,
                            y: -300,
                        },
                    }),
                    new Text({
                        name: "WinTitle",
                        scene: props.context.scenes.hudScene,
                        text: "Ты выиграл!",
                        size: 200,
                        position: {
                            x: 0,
                            y: -300,
                        },
                    }),
                    new Toggle({
                        name: "Toggle",
                        scene: props.context.scenes.hudScene,
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.CompleteUi),
            }
        )
    }
}
