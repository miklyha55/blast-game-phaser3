import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { Text } from "../components/text/Text";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class ScorePanel {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        const { width: gameWidth, height: gameHeidth }
            = props.context.scenes.gameScene.sys.game.canvas;

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "ScorePanel",
                scene: props.context.scenes.hudScene,
                conponents: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.hudScene,
                        texture: ASSETS_NAME.PanelScore,
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        position: {
                            x: gameWidth / 2 + 650,
                            y: gameHeidth / 2 - 200,
                        },
                        scale: {
                            x: 0.7,
                            y: 0.7,
                        }
                    }),
                    new Text({
                        name: "Moves",
                        scene: props.context.scenes.hudScene,
                        text: props.context.jsonGame.movesCount  + "",
                        size: 400,
                        position: {
                            x: 0,
                            y: -190,
                        },
                    }),
                    new Text({
                        name: "Title",
                        scene: props.context.scenes.hudScene,
                        text: "Oчки:",
                        size: 130,
                        position: {
                            x: 0,
                            y: 180,
                        },
                    }),
                    new Text({
                        name: "Points",
                        scene: props.context.scenes.hudScene,
                        text: "0",
                        size: 150,
                        position: {
                            x: 0,
                            y: 320,
                        },
                    })
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.GameUi),
            }
        )
    }
}
