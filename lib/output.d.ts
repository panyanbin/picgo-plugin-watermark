/// <reference types="node" />
import Logger from "picgo/dist/src/lib/Logger";
interface IInput {
    input: any[];
    minWidth: number;
    minHeight: number;
    position: string;
    waterMark: string | Buffer;
}
interface IOutput {
    width: number;
    height: number;
    fileName: string;
    extname: string;
    buffer: Buffer;
}
export declare const outputGen: (iinput: IInput, logger: Logger) => Promise<IOutput[]>;
export {};
