"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxLength: 20,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: {
        originalname: { type: String },
        path: {
            type: String,
            default: 'https://res.cloudinary.com/doh6rpdke/image/upload/w_200,h_200/v1620939020/code-ground/avatars/avatar-1577909_960_720_r9xjzp_g5kosd.webp',
        },
        cloudinaryId: { type: String },
    },
    bookmarked: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'CodeGround',
        },
    ],
    codeGrounds: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'CodeGround',
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.model('User', userSchema);
//# sourceMappingURL=User.js.map