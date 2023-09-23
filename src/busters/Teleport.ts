import { CompareEffect } from '../components/compareEffect/CompareEffect';
import { COMPONENT_EVENTS } from '../components/core/events';
import { Text } from '../components/text/Text';
import { Cell } from '../managers/grid/Cell';
import { GridManager } from '../managers/grid/GridManager';
import { IROContextCfg } from '../scenes/types';
import { Buster } from './core/Buster';

export class Teleport extends Buster {
    private teleportCells: Cell[];

    constructor(
        context: IROContextCfg,
        gridManager: GridManager,
        uiContainer: Phaser.GameObjects.Container,
        textComponent: Text,
    ) {
        super(context, gridManager, uiContainer, textComponent);

        this.teleportCells = [];
    }

    async teleport(cell: Cell) {
        this.teleportCells.push(cell);

        if(this.teleportCells.length < 2) {
            cell.gameObject.container.alpha = 0.5;
            return;
        }

        this.teleportCells[0].gameObject.container.alpha = 1;

        const firstColor: string = this.teleportCells[0].color;
        const secondColor: string = this.teleportCells[1].color;

        const firstCompareEffect: CompareEffect
            = this.teleportCells[0].gameObject.getComponentByName("CompareEffect") as CompareEffect;
        const secondCompareEffect: CompareEffect
            = this.teleportCells[1].gameObject.getComponentByName("CompareEffect") as CompareEffect;

        await firstCompareEffect.start();

        this.teleportCells[0].gameObject.container
            .emit(COMPONENT_EVENTS.SET_TEXTURE, secondColor);
        this.teleportCells[0].color = secondColor;

        await secondCompareEffect.start();

        this.teleportCells[1].color = firstColor;
        this.teleportCells[1].gameObject.container
            .emit(COMPONENT_EVENTS.SET_TEXTURE, firstColor);

        this.teleportCells = [];
        this.final();
    }
}
