"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.uploader = void 0;
const cloudinary = await Promise.resolve().then(() => __importStar(require('cloudinary'))).v2;
exports.cloudinary = cloudinary;
const { CloudinaryStorage } = await Promise.resolve().then(() => __importStar(require('multer-storage-cloudinary')));
const multer = await Promise.resolve().then(() => __importStar(require('multer')));
const process_1 = __importDefault(require("process"));
cloudinary.config({
    cloud_name: process_1.default.env.CLOUDINARY_NAME,
    api_key: process_1.default.env.CLOUDINARY_KEY,
    api_secret: process_1.default.env.CLOUDINARY_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'code-ground',
        allowed_formats: 'jpg, jpeg, png, gif',
    },
});
const uploader = multer({ storage });
exports.uploader = uploader;
//# sourceMappingURL=cloudinary.js.map