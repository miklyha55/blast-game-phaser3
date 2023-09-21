import { GameObjectManager } from "../../managers/gameObject/GameObjectManager";
import { IROGridCfg } from "../../managers/grid/types";
import { RenderManager } from "../../managers/render/RenderManager";
import GameScene from "../GameScene";
import HudScene from "../HudScene";

export interface IROContextCfg {
    readonly scenes: IROScenesCfg;
    readonly jsonGame: IROJsonGame;
    readonly renderGameManager: RenderManager;
    readonly renderUiManager: RenderManager;
    readonly gameObjectManager: GameObjectManager;
}

export interface IROScenesCfg {
    readonly gameScene: GameScene;
    readonly hudScene: HudScene;
}

export interface IROJsonGame {
    readonly minCompareCount: number,
    readonly shuffleCount: number,
    readonly movesCount: number,
    readonly winCount: number,
    readonly bombCount: number,
    readonly bombRadius: number,

    readonly grid: IROGridCfg;
}
