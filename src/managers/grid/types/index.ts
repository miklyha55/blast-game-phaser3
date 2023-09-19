import { IROContextCfg } from "../../../scenes/types";
import { IROGameObjectCfg } from "../../gameObject/types";

export interface IROGridCfg {
    readonly col: number;
    readonly row: number;
    readonly size: number;
}

export interface IROCellCfg {
    readonly col: number;
    readonly row: number;
    readonly context: IROContextCfg;
    
    readonly color?: string;
}