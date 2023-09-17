import { ICellVec2, IVec2 } from "./types";

export namespace Utils {
    export function getPositionFromCell(cellVec2: ICellVec2, size: number): IVec2 {
        return {
            x: cellVec2.col * size,
            y: cellVec2.row * size,
        }
    }

    export function getCellVec2FromPosition(position: IVec2, size: number): ICellVec2 {
        return {
            col: position.x / size,
            row: position.y / size,
        }
    }

    export function add(vec1: IVec2, vec2: IVec2): IVec2 {
        return {
            x: vec1.x + vec2.x,
            y: vec1.y + vec2.y,
        };
    }

    export function sub(vec1: IVec2, vec2: IVec2): IVec2 {
        return {
            x: vec1.x - vec2.x,
            y: vec1.y - vec2.y,
        };
    }

    export function mul(vec: IVec2, number: number): IVec2 {
        return {
            x: vec.x * number,
            y: vec.y * number,
        };
    }

    export function mag(vec: IVec2): number {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    }
}
