export const enum RENDER_LAYERS_NAME {
    Blocks = "Blocks",
    Bg = "Bg",
    ScorePanel = "ScorePanel",
    CompletePopup = "CompletePopup",
}

export const RENDER_GAME_LAYERS: string[] = [
    RENDER_LAYERS_NAME.Bg,
    RENDER_LAYERS_NAME.Blocks,
]

export const RENDER_UI_LAYERS: string[] = [
    RENDER_LAYERS_NAME.ScorePanel,
    RENDER_LAYERS_NAME.CompletePopup,
]
