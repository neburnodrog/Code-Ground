"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/code_ground';
mongoose_1.default
    .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
    .catch((err) => {
    console.error('Error connecting to mongo: ', err);
});
//# sourceMappingURL=index.js.map