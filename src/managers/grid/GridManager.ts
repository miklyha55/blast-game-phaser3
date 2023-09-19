import * as Phaser from 'phaser';

import { IROGridCfg } from "./types";
import { IVec2 } from '../../utils/types';

export class GridManager {
    private readonly props: IROGridCfg;
    private readonly scene: Phaser.Scene;
    private readonly container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, props: IROGridCfg) {
        this.props = props;
        this.scene = scene;
        this.container = this.scene.add.container(0, 0);

        this.createGrid();
    }

    createGrid() {
        let index: number = 0;

        for (let col = 0; col < this.props.col; col++) {
            for (let row = 0; row < this.props.row; row++) {
                const position: IVec2 = {
                    x: col * this.props.size,
                    y: row * this.props.size,
                }

                index++;
            }
        }
    }
}
