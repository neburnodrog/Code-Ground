"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const process_1 = __importDefault(require("process"));
exports.default = (app) => {
    app.set('trust proxy', 1);
    app.use(cors_1.default({
        credentials: true,
        origin: process_1.default.env.ORIGIN || 'http://localhost:3000',
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(morgan_1.default('dev'));
    app.use(cookie_parser_1.default());
};
//# sourceMappingURL=index.js.map