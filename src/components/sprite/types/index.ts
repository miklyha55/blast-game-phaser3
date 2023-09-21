import { IVec2 } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IROSpriteCfg extends IROComponentCfg {
    readonly texture: string;
    readonly origin?: IVec2;
    readonly position?: IVec2;
}
