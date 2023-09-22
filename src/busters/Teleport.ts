import { CompareEffect } from '../components/compareEffect/compareEffect';
import { Component } from '../components/core/Component';
import { COMPONENT_EVENTS } from '../components/core/events';
import { TeleportCommand } from '../components/input/commands/TeleportCommand';
import { Text } from '../components/text/Text';
import { Cell } from '../managers/grid/Cell';
import { GridManager } from '../managers/grid/GridManager';
import { IROContextCfg } from '../scenes/types';

export class Teleport {
    private readonly gridManager: GridManager;
    private readonly context: IROContextCfg;

    private count: number;
    private teleportCells: Cell[];

    constructor(context: IROContextCfg, gridManager: GridManager) {
        this.gridManager = gridManager;
        this.context = context;

        this.teleportCells = [];
        this.count = this.context.jsonGame.teleportCount;
    }

    reset() {
        this.count = this.context.jsonGame.teleportCount;
        this.uiDataUpdate();

        this.context.scenes.hudScene.buttonTeleport.gameObject.container.alpha = 1;
        this.gridManager.toggleCellInput(false);
        this.gridManager.toggleCellInput(true);
    }

    setCommand() {
        if(!this.count) {
            return;
        }

        this.gridManager.toggleCellInput(false);
        this.context.scenes.hudScene.buttonTeleport.gameObject.container.alpha = 0.5;

        this.gridManager.cells.forEach(cell => {
            const teleportCommand: Component = new TeleportCommand(
                cell,
                this.context,
            )
            cell.gameObject.addComponent(teleportCommand);
        });

        this.count--;
        this.uiDataUpdate();
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
        this.context.scenes.hudScene.buttonTeleport.gameObject.container.alpha = 1;
        this.gridManager.toggleCellInput(false);
        this.gridManager.toggleCellInput(true);
    }

    private uiDataUpdate() {
        const pointText: Text =
            this.context.scenes.hudScene
                .buttonTeleport.gameObject.getComponentByName("Points") as Text;

        pointText.setText(this.count + "");
    }
}
