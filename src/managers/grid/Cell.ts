import { Sprite } from '../../components/sprite/Sprite';
import { RENDER_LAYERS_NAME } from '../render/constants';
import { ASSETS_NAME } from '../../configs/assets/Assets';
import { CellCommand } from '../../inputs/commands/CellCommand';
import { COMPONENT_EVENTS } from '../../components/core/events';
import { Random } from '../../components/random/Random';
import { IROCellCfg } from './types';
import { GameObject } from '../gameObject/GameObject';
import { IROContextCfg } from '../../scenes/types';

export class Cell {
    col: number;
    row: number;
    color: string;
    gameObject: GameObject;
    context: IROContextCfg;

    constructor(props: IROCellCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Cell",
                scene: props.context.scenes.gameScene,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Blocks),
                conponents: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.gameScene,
                        texture: ASSETS_NAME.BlueBlock,
                        origin: {x: 0.5, y: 0.5},
                    }),
                    new Random({
                        name: "Random",
                        scene: props.context.scenes.gameScene,
                    })
                ],
                context: props.context,
            }
        )

        this.context = props.context;
        this.col = props.col;
        this.row = props.row;

        this.onCreate();
        this.gameObject.onRemove = () => {
            this.onRemove();
        }
    }

    private onCreate() {
        this.gameObject.container.on(COMPONENT_EVENTS.SET_TEXTURE, this.onSetTexture, this);

        this.gameObject.container.emit(COMPONENT_EVENTS.ADD_RANDOM);
        new CellCommand(this, this.context);
    }

    private onRemove() {
        this.gameObject.container.off(COMPONENT_EVENTS.SET_TEXTURE, this.onSetTexture, this);
    }

    private onSetTexture(key: string) {
        this.color = key;
    }
}
