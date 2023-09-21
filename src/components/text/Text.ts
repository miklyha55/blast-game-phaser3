import * as Phaser from 'phaser';

import { Component } from '../core/Component';
import { IROTextCfg } from './types';

export class Text extends Component
{
    text: Phaser.GameObjects.Text;

    constructor(props: IROTextCfg) {
        super(props);

        this.text = props.scene.add.text(props.position.x, props.position.y, props.text);
        this.text.setOrigin(props.origin.y, props.origin.y);
        this.text.setFontSize(props.size);

        this.container.add(this.text);
    }

    setText(text: string) {
        this.text.setText(text);
    }
}
