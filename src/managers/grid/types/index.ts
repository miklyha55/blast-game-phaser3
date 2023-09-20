import { IROPrefabCfg } from "../../gameObject/types";
import { Cell } from "../Cell";

export interface IROGridCfg {
    readonly col: number;
    readonly row: number;
    readonly size: number;
    readonly moveDelay: number;
}

export interface IROCellCfg extends IROPrefabCfg {
    readonly col: number;
    readonly row: number;
    
    readonly color?: string;
}

export interface IROMoveCellCfg {
    readonly step: number;
    readonly cell: Cell;
}