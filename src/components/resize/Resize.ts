import { Component } from '../core/Component';
import { IROResizeCfg } from './types';

export class Resize extends Component
{
    private readonly props: IROResizeCfg;

    constructor(props: IROResizeCfg) {
        super(props);
        
        this.props = props;
    }

    override onCreate() {
        this.parent.setPosition(this.props.position.x, this.props.position.y);
        this.props.size && this.parent.setSize(this.props.size.width, this.props.size.height);
        this.props.scale && this.parent.setScale(this.props.scale.x, this.props.scale.y);
    }
}
