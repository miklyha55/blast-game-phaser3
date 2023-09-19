import { RenderManager } from "../../managers/render/RenderManager";
import GameScene from "../GameScene";
import HudScene from "../HudScene";

export interface IROContextCfg {
    readonly scenes: IROScenesCfg;
    readonly jsonGame: IROJsonGame;
    readonly renderGameManager: RenderManager;
    readonly renderUiManager: RenderManager;
}

export interface IROScenesCfg {
    readonly gameScene: GameScene;
    readonly hudScene: HudScene;
}

export interface IROJsonGame {}
