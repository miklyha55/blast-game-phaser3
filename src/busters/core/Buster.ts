import { Component } from '../../components/core/Component';
import { BusterCommand } from '../../components/input/commands/busters/core/BusterCommand';
import { Text } from '../../components/text/Text';
import { GridManager } from '../../managers/grid/GridManager';
import { IROContextCfg } from '../../scenes/types';
import { BUSTERS_EVENTS } from './events';

export class Buster {
    protected readonly gridManager: GridManager;
    protected readonly context: IROContextCfg;

    protected count: number;
    protected isActive: boolean;
    protected isAnyBuster: boolean;
    protected uiContainer: Phaser.GameObjects.Container;
    protected textComponent: Text;

    constructor(
        context: IROContextCfg,
        gridManager: GridManager,
        uiContainer: Phaser.GameObjects.Container,
        textComponent: Text,
    ) {
        this.gridManager = gridManager;
        this.context = context;
        this.uiContainer = uiContainer;
        this.textComponent = textComponent;

        this.count = this.context.jsonGame.teleportCount;
        this.isActive = false;
        this.isAnyBuster = false;

        this.toggleEvents(true);
    }

    reset() {
        this.count = this.context.jsonGame.teleportCount;
        this.uiDataUpdate();

        this.uiContainer.alpha = 1;
        this.gridManager.toggleCellInput(false);
        this.gridManager.toggleCellInput(true);
    }

    toggleEvents(active: boolean) {
        const foo: string = active ? "on" : "off";

        this.context.scenes.hudScene.events[foo](BUSTERS_EVENTS.TOGGLE_ACTIVE, this.onToggleActive, this);
    }

    setCommand(commandClass: typeof BusterCommand) {
        if(this.isAnyBuster) {
            return;
        }

        this.context.scenes.hudScene.events
            .emit(BUSTERS_EVENTS.TOGGLE_ACTIVE, true, this.uiContainer);

        this.isActive = true;

        this.gridManager.toggleCellInput(false);
        this.uiContainer.alpha = 0.5;

        this.gridManager.cells.forEach(cell => {
            const command: Component = new commandClass({
                cell,
                context: this.context,
            });
            cell.gameObject.addComponent(command);
        });

        this.count--;
        this.uiDataUpdate();
    }

    private uiDataUpdate() {
        this.textComponent.setText(this.count + "");
    }

    private onToggleActive(active: boolean, uiContainer: Phaser.GameObjects.Container) {
        this.isAnyBuster = active;
    }

    protected final() {
        this.isActive = false;

        this.context.scenes.hudScene.events
            .emit(BUSTERS_EVENTS.TOGGLE_ACTIVE, false, this.uiContainer);

        this.uiContainer.alpha = !this.count ? 0.5 : 1;
        this.gridManager.toggleCellInput(false);
        this.gridManager.toggleCellInput(true);
    }
}
