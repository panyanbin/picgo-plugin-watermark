/// <reference types="node" />
import Picgo from "picgo";
import Logger from "picgo/dist/src/lib/Logger";
interface IInput {
    input: any[];
    minWidth: number;
    minHeight: number;
    position: string;
    waterMark: string | Buffer;
}
export declare const inputAddWaterMarkHandle: (ctx: Picgo, iinput: IInput, logger: Logger) => Promise<string[]>;
export {};
