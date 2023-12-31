import { Sprite } from '../../components/sprite/Sprite';
import { ASSETS_NAME } from '../../configs/assets/Assets';
import { COMPONENT_EVENTS } from '../../components/core/events';
import { Random } from '../../components/random/Random';
import { IROCellCfg } from './types';
import { GameObject } from '../gameObject/GameObject';
import { IROContextCfg } from '../../scenes/types';
import { CompareCommand } from '../../components/input/commands/CompareCommand';
import { CompareEffect } from '../../components/compareEffect/CompareEffect';

export class Cell {
    col: number;
    row: number;
    color: string;
    gameObject: GameObject;
    context: IROContextCfg;
    isDeathPrepare: boolean;

    constructor(props: IROCellCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Cell",
                scene: props.context.scenes.gameScene,
                conponents: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.gameScene,
                        texture: ASSETS_NAME.BlueBlock,
                    }),
                    new Random({
                        name: "Random",
                        scene: props.context.scenes.gameScene,
                    }),
                    new CompareCommand(
                        this,
                        props.context,
                    ),
                    new CompareEffect({
                        name: "CompareEffect",
                        scene: props.context.scenes.gameScene,
                    })
                ],
                context: props.context,
            }
        )

        this.context = props.context;
        this.col = props.col;
        this.row = props.row;
        this.isDeathPrepare = false;

        this.onCreate();

        this.gameObject.onRemove = () => {
            this.onRemove();
        }
    }

    remove() {}

    private onCreate() {
        this.gameObject.container.on(COMPONENT_EVENTS.SET_TEXTURE, this.onSetTexture, this);
        this.gameObject.container.emit(COMPONENT_EVENTS.ADD_RANDOM);
    }

    private onRemove() {
        this.gameObject.container.off(COMPONENT_EVENTS.SET_TEXTURE, this.onSetTexture, this);
    }

    private onSetTexture(key: string) {
        this.color = key;
    }
}
