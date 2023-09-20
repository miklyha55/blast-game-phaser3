import { IROContextCfg } from "../../../scenes/types";
import { Cell } from "../Cell";

export interface IROGridCfg {
    readonly col: number;
    readonly row: number;
    readonly size: number;
    readonly moveDelay: number;
}

export interface IROCellCfg {
    readonly col: number;
    readonly row: number;
    readonly context: IROContextCfg;
    
    readonly color?: string;
}

export interface IROBgCfg {
    readonly context: IROContextCfg;
}

export interface IROMoveCellCfg {
    readonly step: number;
    readonly cell: Cell;
}