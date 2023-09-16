import GameScene from "../GameScene";
import HudScene from "../HudScene";

export interface IROContextCfg {
    readonly scenes: IROScenesCfg;
    readonly jsonGame: IROJsonGame;
}

export interface IROScenesCfg {
    readonly gameScene: GameScene;
    readonly hudScene: HudScene;
}

export interface IROJsonGame {}