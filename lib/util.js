"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageBufferData = exports.downloadImage = exports.isUrl = exports.parseAndValidate = exports.getCoordinateByPosition = exports.PositionType = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const color_1 = __importDefault(require("color"));
const attr_1 = require("./attr");
var PositionType;
(function (PositionType) {
    PositionType["lt"] = "left-top";
    PositionType["ct"] = "center-top";
    PositionType["rt"] = "right-top";
    PositionType["lm"] = "left-middle";
    PositionType["cm"] = "center-middle";
    PositionType["rm"] = "right-middle";
    PositionType["lb"] = "left-bottom";
    PositionType["cb"] = "center-bottom";
    PositionType["rb"] = "right-bottom";
})(PositionType = exports.PositionType || (exports.PositionType = {}));
exports.getCoordinateByPosition = (prop) => {
    const { width, height, waterMark } = prop;
    const p = waterMark.position.split("-");
    return p.reduce((acc, pos) => {
        switch (pos) {
            case "left":
                acc.left = attr_1.OFFSET.X;
                break;
            case "center":
                acc.left = Math.floor((width - waterMark.width) / 2);
                break;
            case "right":
                acc.left = Math.floor(width - attr_1.OFFSET.X - waterMark.width);
                break;
            case "top":
                acc.top = attr_1.OFFSET.Y;
                break;
            case "middle":
                acc.top = Math.floor((height - waterMark.height) / 2);
                break;
            case "bottom":
                acc.top = Math.floor(height - attr_1.OFFSET.Y - waterMark.height);
                break;
        }
        return acc;
    }, { left: 0, top: 0 });
};
exports.parseAndValidate = config => {
    const { position, fontSize, minSize, textColor } = config;
    const parsedFontSize = parseInt(fontSize);
    let parsedConfig = { ...config };
    let errors = [];
    // 无效数字且不为空
    if (isNaN(parsedFontSize) && fontSize !== null) {
        errors.push("fontSize");
    }
    else {
        parsedConfig.parsedFontSize = parsedFontSize;
    }
    if (position && !PositionType[position]) {
        errors.push("position");
    }
    if (minSize) {
        let [minWidth, minHeight] = minSize.split("*").map((v) => +v);
        if (!minWidth || !minHeight) {
            errors.push("minSize");
        }
        else {
            parsedConfig.minHeight = minHeight;
            parsedConfig.minWidth = minWidth;
        }
    }
    if (textColor) {
        try {
            parsedConfig.textColor = color_1.default(textColor).hex();
        }
        catch (error) {
            errors.push('textColor');
        }
    }
    return [
        errors,
        {
            ...config,
            ...parsedConfig
        }
    ];
};
// 是否是网络图片
exports.isUrl = (url) => {
    return /^https?:\/\//.test(url);
};
exports.downloadImage = async (ctx, url) => {
    return await ctx.request({ method: 'GET', url, encoding: null })
        .on('error', function (err) {
        ctx.log.error(`网络图片下载失败，${url}`);
        ctx.log.error(err);
    }).on('response', (response) => {
        const contentType = response.headers['content-type'];
        if (contentType && !contentType.includes('image')) {
            throw new Error(`${url} is not image`);
        }
    });
};
exports.getImageBufferData = (ctx, imageUrl) => {
    if (exports.isUrl(imageUrl)) {
        return exports.downloadImage(ctx, imageUrl);
    }
    else {
        return fs_extra_1.default.readFile(imageUrl);
    }
};
//# sourceMappingURL=util.js.map