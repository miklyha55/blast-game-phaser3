import { Component } from '../core/Component';
import { COMPONENT_EVENTS } from '../core/events';
import { IROComponentCfg } from '../core/types';

export class Toggle extends Component
{
    constructor(props: IROComponentCfg) {
        super(props);
    }

    override onCreate() {
        this.parent.on(COMPONENT_EVENTS.TOGGLE_ACTIVE, this.onToggle, this);
    }

    override onRemove() {
        this.parent.off(COMPONENT_EVENTS.TOGGLE_ACTIVE, this.onToggle, this);
    }

    private onToggle(active: boolean) {
        this.parent.active = active;
        this.parent.alpha = Number(active);
    }
}
