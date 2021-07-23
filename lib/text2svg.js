"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSvg = exports.loadFontFamily = void 0;
const text_to_svg_1 = __importDefault(require("text-to-svg"));
const attr_1 = require("./attr");
let textToSVG = null;
exports.loadFontFamily = (fontFamily) => {
    textToSVG = text_to_svg_1.default.loadSync(fontFamily);
};
exports.getSvg = (text, options) => {
    const svgOptions = {
        attributes: {},
        ...attr_1.fontOptions
    };
    if (options) {
        svgOptions.attributes = {
            ...svgOptions.attributes,
            ...options
        };
        if (options.fontSize) {
            svgOptions.fontSize = options.fontSize;
        }
    }
    return textToSVG.getSVG(text, svgOptions);
};
//# sourceMappingURL=text2svg.js.map