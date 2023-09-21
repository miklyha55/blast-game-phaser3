export const enum RENDER_LAYERS_NAME {
    Blocks = "Blocks",
    Bg = "Bg",
    GameUi = "GameUi",
    CompleteUi = "CompleteUi",
}

export const RENDER_GAME_LAYERS: string[] = [
    RENDER_LAYERS_NAME.Bg,
    RENDER_LAYERS_NAME.Blocks,
]

export const RENDER_UI_LAYERS: string[] = [
    RENDER_LAYERS_NAME.GameUi,
    RENDER_LAYERS_NAME.CompleteUi,
]
