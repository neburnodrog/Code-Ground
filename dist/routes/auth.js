"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            res
                .status(400)
                .json({ message: 'you must provide all the required fields' });
            return;
        }
        if (password.length < 8) {
            res
                .status(400)
                .json({ message: 'your password has to be at least 8 chars long' });
            return;
        }
        if (username === '') {
            res
                .status(400)
                .json({ message: 'The username field cannot remain be empty' });
            return;
        }
        const userDb = yield User_1.default.findOne({ username: username });
        if (userDb !== null) {
            res.status(400).json({ message: 'This username is already taken' });
            return;
        }
        const salt = bcrypt_1.default.genSaltSync();
        const hash = bcrypt_1.default.hashSync(password, salt);
        const newUser = yield User_1.default.create({
            username,
            email,
            password: hash,
        });
        res.status(200).json({ newUser });
        // req.login(newUser, (err) => {
        //   if (err) {
        //     return res
        //       .status(500)
        //       .json({ message: 'Error while attempting to login' });
        //   } else {
        //     return res.status(200).json(newUser);
        //   }
        // });
    }
    catch (err) {
        res.json(err);
    }
}));
router.post('/login', (req, res) => {
    console.log('back-end login route');
    passport_1.default.authenticate('local', (err, user) => {
        if (err) {
            console.log('backend auth login route line 70', err);
            return res.status(400).json({ message: 'Error logging in' });
        }
        if (!user) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }
        req.login(user, (err) => {
            if (err) {
                console.log('backend auth login route line 80', err);
                return res.status(500).json({ message: 'Error while logging in' });
            }
            else {
                return res.status(200).json(user);
            }
        });
    })(req, res);
});
router.get('/logged-in', (req, res) => {
    res.json(req.user);
});
router.delete('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Log Out Successful' });
});
exports.default = router;
//# sourceMappingURL=auth.js.map