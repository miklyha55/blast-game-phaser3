import { IROResourceCfg } from "./types";
export const enum ASSETS_NAME {
    GameCfg = "gameCfg",
    Bg = "bg",
    BtnShort = "btnShort",
    PanelBuster = "panelBuster",
    PanelScore = "panelScore",
    IconBomb = "iconBomb",
    IconTeleport = "IconTeleport",
    BlueBlock = "blue",
    GreenBlock = "green",
    PinkBlock = "pink",
    RedBlock = "red",
    YellowBlock = "yellow",
}

export const Assets: ReadonlyArray<IROResourceCfg> = [
    {
        name: ASSETS_NAME.GameCfg,
        path: "assets/jsons/game.json",
        type: "json",
    },
    {
        name: ASSETS_NAME.Bg,
        path: "assets/images/game/bg.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.BtnShort,
        path: "assets/images/ui/btn_short.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.PanelBuster,
        path: "assets/images/ui/panel_buster.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.PanelScore,
        path: "assets/images/ui/panel_score.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.IconBomb,
        path: "assets/images/ui/icons/icon_bomb.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.IconTeleport,
        path: "assets/images/ui/icons/icon_teleport.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.BlueBlock,
        path: "assets/images/game/blocks/blue.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.GreenBlock,
        path: "assets/images/game/blocks/green.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.PinkBlock,
        path: "assets/images/game/blocks/pink.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.RedBlock,
        path: "assets/images/game/blocks/red.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.YellowBlock,
        path: "assets/images/game/blocks/yellow.png",
        type: "image",
    },
];
