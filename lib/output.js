"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputGen = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const util_1 = require("./util");
exports.outputGen = async (imageInput, logger) => {
    const { input, minWidth, minHeight, waterMark, position } = imageInput;
    const sharpedWaterMark = sharp_1.default(waterMark);
    const waterMarkMeta = await sharpedWaterMark.metadata();
    const output = await Promise.all(input.map(async (image) => {
        const fileName = path_1.default.basename(image);
        const extname = path_1.default.extname(image);
        const sharpedImage = sharp_1.default(image);
        const { width, height } = await sharpedImage.metadata();
        const coordinate = util_1.getCoordinateByPosition({
            width,
            height,
            waterMark: {
                width: waterMarkMeta.width,
                height: waterMarkMeta.height,
                position: util_1.PositionType[position]
            }
        });
        logger.info(JSON.stringify(coordinate));
        let transformedImage = {
            width,
            height,
            fileName,
            extname,
            buffer: null
        };
        // Picture width or length is too short, do not add watermark
        // Or trigger minimum size limit
        if (coordinate.left <= 0 ||
            coordinate.top <= 0 ||
            width <= minWidth ||
            height <= minHeight) {
            transformedImage.buffer = await sharpedImage.toBuffer();
        }
        else {
            transformedImage.buffer = await sharpedImage
                .composite([
                {
                    input: await sharpedWaterMark.toBuffer(),
                    ...coordinate
                }
            ])
                .toBuffer();
        }
        return transformedImage;
    }));
    return output;
};
//# sourceMappingURL=output.js.map