import { InputCatcher } from "../../../InputCatcher";
import { Cell } from '../../../../../managers/grid/Cell';
import { IROBusterCommandCfg } from '../../../../../busters/core/types';

export class BusterCommand extends InputCatcher {
    protected cell: Cell;

    constructor(props: IROBusterCommandCfg) {
        super(props.context.scenes.gameScene, props.context);

        this.cell = props.cell;
    }
}
