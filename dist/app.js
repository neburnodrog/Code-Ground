"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
require('./db');
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("process"));
const path_1 = __importDefault(require("path"));
/** APP CONFIG */
const app = express_1.default();
const config_1 = __importDefault(require("./config"));
config_1.default(app);
/** SESSION */
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const DB_URL = process_1.default.env.MONGODB_URI || 'mongodb://localhost/code_ground';
app.use(express_session_1.default({
    secret: process_1.default.env.SESSION_SECRET || 'alohomora',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    resave: true,
    store: connect_mongo_1.default.create({
        mongoUrl: DB_URL,
    }),
}));
const passport_1 = __importDefault(require("./config/passport"));
passport_1.default(app);
// ROUTES
const code_ground_1 = __importDefault(require("./routes/code-ground"));
app.use('/api/code-ground', code_ground_1.default);
const auth_1 = __importDefault(require("./routes/auth"));
app.use('/api/auth', auth_1.default);
const cloudinary_1 = __importDefault(require("./routes/cloudinary"));
app.use('/api/cloudinary', cloudinary_1.default);
const users_1 = __importDefault(require("./routes/users"));
app.use('/api/users', users_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '/client')));
app.use((req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
const error_handling_1 = __importDefault(require("./error-handling"));
error_handling_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map