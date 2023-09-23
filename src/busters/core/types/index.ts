import { Cell } from "../../../managers/grid/Cell";
import { IROContextCfg } from "../../../scenes/types";

export interface IROBusterCommandCfg {
    cell: Cell;
    context: IROContextCfg;
}