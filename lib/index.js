"use strict";
const util_1 = require("./util");
const text2svg_1 = require("./text2svg");
const config_1 = require("./config");
const input_1 = require("./input");
const handle = async (ctx) => {
    const input = ctx.input;
    const userConfig = ctx.getConfig("picgo-plugin-watermark");
    const [errors, { text, position = "rb", parsedFontSize, image, fontFamily, minWidth, minHeight, textColor, }] = util_1.parseAndValidate(userConfig);
    // Verify configuration
    if (errors.length) {
        ctx.emit("notification", {
            title: "watermark设置错误",
            body: errors.join("，") + "设置错误，请检查"
        });
        // To prevent the next step
        throw new Error();
    }
    try {
        text2svg_1.loadFontFamily(fontFamily || undefined);
    }
    catch (error) {
        ctx.log.error("字体文件载入失败");
        ctx.log.error(error);
        ctx.emit("notification", {
            title: "watermark设置错误",
            body: "字体文件载入失败，请检查字体文件路径"
        });
        // To prevent the next step
        throw new Error();
    }
    let waterMark = null;
    if (image) {
        waterMark = image;
    }
    else {
        const svgOptions = {};
        parsedFontSize && (svgOptions.fontSize = parsedFontSize);
        textColor && (svgOptions.fill = textColor);
        waterMark = Buffer.from(text2svg_1.getSvg(text, svgOptions));
    }
    try {
        ctx.input = await input_1.inputAddWaterMarkHandle(ctx, {
            input,
            minHeight,
            minWidth,
            position,
            waterMark
        }, ctx.log);
    }
    catch (error) {
        ctx.log.error(error);
        ctx.emit("notification", {
            title: "watermark转化错误",
            body: "可能是水印图或字体文件路径无效，请检查。"
        });
        // To prevent the next step
        throw new Error();
    }
    return ctx;
};
module.exports = (ctx) => {
    const register = () => {
        ctx.helper.beforeTransformPlugins.register("watermark", { handle });
    };
    return {
        register,
        config: config_1.config
    };
};
//# sourceMappingURL=index.js.map