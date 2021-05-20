"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinary_1 = require("../config/cloudinary");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.Router();
router.post('/new-pic/:id', cloudinary_1.uploader.single('pic'), (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    let { path } = req.file;
    const { filename: cloudinaryId, originalname } = req.file;
    path = cloudinary_1.cloudinary.url(cloudinaryId, {
        gravity: 'face',
        height: 200,
        width: 200,
        crop: 'thumb',
    });
    User_1.default.findByIdAndUpdate(req.params.id, {
        avatar: { cloudinaryId, path, originalname },
    })
        .then((oldUser) => {
        if (oldUser && oldUser.avatar !== null) {
            cloudinary_1.cloudinary.uploader.destroy(oldUser.avatar.cloudinaryId);
        }
        res.status(200).json({ path });
    })
        .catch((err) => next(err));
});
exports.default = router;
//# sourceMappingURL=cloudinary.js.map