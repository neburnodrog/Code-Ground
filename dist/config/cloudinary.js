"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.uploader = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const process_1 = __importDefault(require("process"));
cloudinary_1.v2.config({
    cloud_name: process_1.default.env.CLOUDINARY_NAME,
    api_key: process_1.default.env.CLOUDINARY_KEY,
    api_secret: process_1.default.env.CLOUDINARY_SECRET,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'code-ground',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
});
const uploader = multer_1.default({ storage });
exports.uploader = uploader;
//# sourceMappingURL=cloudinary.js.map