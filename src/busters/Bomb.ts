import { Text } from '../components/text/Text';
import { Cell } from '../managers/grid/Cell';
import { GridManager } from '../managers/grid/GridManager';
import { IROContextCfg } from '../scenes/types';
import { Buster } from './core/Buster';

export class Bomb extends Buster {
    constructor(
        context: IROContextCfg,
        gridManager: GridManager,
        uiContainer: Phaser.GameObjects.Container,
        textComponent: Text,
    ) {
        super(context, gridManager, uiContainer, textComponent);
    }

    async boom(cell: Cell) {
        const removeCells: Cell[] = [];
        const directionCount: number = 8;
        const radius: number = this.context.jsonGame.bombRadius;

        removeCells.push(cell);
        this.context.scenes.gameScene.cameras.main.shake(30, 0.02);
          
        for (let i = 0; i < radius; i++) {
            const delta: number = (i + 1) * directionCount;

            for (let j = 0; j < delta; j++) {
                const angle: number = 360 / delta * (j + 1);
                const radian: number = angle * Math.PI / 180;
                
                this.gridManager.cells.forEach((cellFind) => {
                    if(
                        cellFind &&
                        cellFind.row >= this.context.jsonGame.grid.row &&
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
        await this.gridManager.updateCell();

        this.final();
    }
}
