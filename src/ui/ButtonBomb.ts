import { ButtonBombCommand } from "../components/input/commands/busters/ButtonBombCommand";
import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { Text } from "../components/text/Text";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class ButtonBomb {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        const { width: gameWidth, height: gameHeidth }
            = props.context.scenes.gameScene.sys.game.canvas;        

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "ButtonBomb",
                scene: props.context.scenes.hudScene,
                conponents: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.hudScene,
                        texture: ASSETS_NAME.PanelBuster,
                    }),
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.hudScene,
                        texture: ASSETS_NAME.IconBomb,
                        position: {
                            x: 17,
                            y: -65,
                        },
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        position: {
                            x: gameWidth / 2 + 850,
                            y: gameHeidth / 2 + 400,
                        },
                    }),
                    new Text({
                        name: "Points",
                        scene: props.context.scenes.hudScene,
                        text: props.context.jsonGame.bombCount + "",
                        size: 90,
                        position: {
                            x: 0,
                            y: 110,
                        },
                        origin: {
                            x: 0.5,
                            y: 0.5,
                        },
                    }),
                    new ButtonBombCommand(props.context),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.GameUi),
            }
        )
    }
}
