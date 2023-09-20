import { ISize, IVec2 } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IROResizeCfg extends IROComponentCfg {
    readonly position: IVec2;
    readonly size?: ISize;
    readonly scale?: IVec2;
}
