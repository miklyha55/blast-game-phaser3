import { IVec2 } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IROSpriteCfg extends IROComponentCfg {
    texture: string;
    origin?: IVec2;
}
