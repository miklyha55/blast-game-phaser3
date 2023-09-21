import { ButtonResetCommand } from "../components/input/commands/ButtonResetCommand";
import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { Text } from "../components/text/Text";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";

export class ButtonReset {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "ButtonReset",
                scene: props.context.scenes.hudScene,
                conponents: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.hudScene,
                        texture: ASSETS_NAME.BtnShort,
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        position: {
                            x: 0,
                            y: 400,
                        },
                        scale: {
                            x: 2,
                            y: 2,
                        }
                    }),
                    new Text({
                        name: "Text",
                        scene: props.context.scenes.hudScene,
                        text: "Заново",
                        size: 70,
                        position: {
                            x: 0,
                            y: 0,
                        },
                    }),
                    new ButtonResetCommand(props.context),
                ],
                context: props.context,
            }
        )
    }
}
