"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** PASSPORT */
const User_1 = __importDefault(require("../models/User"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = (app) => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport_1.default.deserializeUser((id, done) => {
        User_1.default.findById(id)
            .then((dbUser) => {
            done(null, dbUser);
        })
            .catch((err) => {
            done(err);
        });
    });
    passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
        User_1.default.findOne({ username: username }, function (err, user) {
            if (err) {
                console.log('error in passport.js line 26', err);
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Wrong Cretentials' });
            }
            if (!bcrypt_1.default.compareSync(password, user.password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
};
//# sourceMappingURL=passport.js.map