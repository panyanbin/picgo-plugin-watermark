/// <reference types="node" />
import Picgo from "picgo";
export declare enum PositionType {
    lt = "left-top",
    ct = "center-top",
    rt = "right-top",
    lm = "left-middle",
    cm = "center-middle",
    rm = "right-middle",
    lb = "left-bottom",
    cb = "center-bottom",
    rb = "right-bottom"
}
interface ICoordinate {
    left: number;
    top: number;
}
export declare const getCoordinateByPosition: (prop: {
    width: number;
    height: number;
    waterMark: {
        width: number;
        height: number;
        position: PositionType;
    };
}) => ICoordinate;
export interface IConfig {
    text: string;
    textColor: string;
    position: string;
    fontSize: string;
    image: string;
    fontFamily: string;
    minSize: string;
    minWidth?: number;
    minHeight?: number;
    parsedFontSize?: number;
}
export declare const parseAndValidate: (config: IConfig) => [string[], IConfig];
export declare const isUrl: (url: string) => boolean;
export declare const downloadImage: (ctx: Picgo, url: string) => Promise<Buffer>;
export declare const getImageBufferData: (ctx: Picgo, imageUrl: string) => Promise<Buffer>;
export {};
