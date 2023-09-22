import { IVec2 } from '../../utils/types';
import { Component } from '../core/Component';
import { IROComponentCfg } from '../core/types';

export class CompareEffect extends Component
{

    constructor(props: IROComponentCfg) {
        super(props);
    }

    start() {
        const speed: number = 50;
        const scale: IVec2 = { x: 1.5, y: 1.5 };
        
        return new Promise<void>((resolve) => {
            this.scene.tweens.add({
                targets: this.parent,
                scaleX: scale.x,
                scaleY: scale.y,
                duration: speed,
                yoyo: true,
                onComplete: () => {
                    resolve();
                }
            });
        })
    }
}
