import { Component } from '../components/core/Component';
import { BombCommand } from '../components/input/commands/BombCommand';
import { Text } from '../components/text/Text';
import { Cell } from '../managers/grid/Cell';
import { GridManager } from '../managers/grid/GridManager';
import { IROContextCfg } from '../scenes/types';

export class Bomb {
    private readonly gridManager: GridManager;
    private readonly context: IROContextCfg;

    private bombCount: number;

    constructor(context: IROContextCfg, gridManager: GridManager) {
        this.gridManager = gridManager;
        this.context = context;

        this.bombCount = this.context.jsonGame.bombCount;
    }

    reset() {
        this.bombCount = this.context.jsonGame.bombCount;
        this.uiDataUpdate();

        this.context.scenes.hudScene.buttonBomb.gameObject.container.alpha = 1;
        this.gridManager.toggleCellInput(false);
        this.gridManager.toggleCellInput(true);
    }

    setBombCommand() {
        if(!this.bombCount) {
            return;
        }

        this.gridManager.toggleCellInput(false);
        this.context.scenes.hudScene.buttonBomb.gameObject.container.alpha = 0.5;

        this.gridManager.cells.forEach(cell => {
            const bombCommand: Component = new BombCommand(
                cell,
                this.context,
            )
            cell.gameObject.addComponent(bombCommand);
        });

        this.bombCount--;
        this.uiDataUpdate();
    }

    boom(cell: Cell) {
        const removeCells: Cell[] = [];
        const directionCount: number = 8;
        const radius: number = this.context.jsonGame.bombRadius;

        removeCells.push(cell);
          
        for (let i = 0; i < radius; i++) {
            const delta: number = (i + 1) * directionCount;

            for (let j = 0; j < delta; j++) {
                const angle: number = 360 / delta * (j + 1);
                const radian: number = angle * Math.PI / 180;
                
                this.gridManager.cells.forEach((cellFind) => {
                    if(
                        cellFind &&
                        cellFind.col === Math.round(cell.col + (i + 1) * Math.cos(radian)) &&
                        cellFind.row === Math.round(cell.row + (i + 1) * Math.sin(radian))
                    ) {
                        removeCells.push(cellFind);
                    }
                });
            }
        }

        removeCells.forEach(removeCell => {
            removeCell.remove();
        });

        this.gridManager.setPoints(removeCells.length);
        this.gridManager.updateCell();

        this.context.scenes.hudScene.buttonBomb.gameObject.container.alpha = 1;
        this.gridManager.toggleCellInput(false);
        this.gridManager.toggleCellInput(true);
    }

    private uiDataUpdate() {
        const pointText: Text =
            this.context.scenes.hudScene
                .buttonBomb.gameObject.getComponentByName("Points") as Text;

        pointText.setText(this.bombCount + "");
    }
}
