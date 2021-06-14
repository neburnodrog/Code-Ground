"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const codeGroundSchema = new mongoose_1.Schema({
    title: {
        type: String,
        default: 'untitled',
        required: true,
        maxLength: 30,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    html: {
        type: String,
    },
    css: {
        type: String,
    },
    js: {
        type: String,
    },
    forked: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            comment: {
                type: String,
                maxLength: 200,
                required: true,
                minLength: 1,
            },
            user: {
                type: mongoose_1.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            likes: [
                {
                    type: mongoose_1.Types.ObjectId,
                    ref: 'User',
                },
            ],
        },
    ],
    likes: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.model('CodeGround', codeGroundSchema);
//# sourceMappingURL=CodeGround.js.map