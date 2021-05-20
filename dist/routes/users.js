"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.Router();
router.get('/:id', (req, res, next) => {
    User_1.default.findById(req.params.id)
        .then((user) => {
        if (!user) {
            res.status(400).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    })
        .catch((err) => next(err));
});
router.get('/:userId/favourites/', (req, res, next) => {
    User_1.default.findById(req.params.userId)
        .populate({ path: 'favourites', populate: { path: 'user' } })
        .then((user) => {
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        console.log(user.favourites);
        res.status(200).json(user.favourites);
    })
        .catch((err) => next(err));
});
router.get('/:userId/favourites/:id', (req, res, next) => {
    const { userId, id } = req.params;
    User_1.default.findOneAndUpdate({ _id: userId }, { $addToSet: { favourites: mongoose_1.Types.ObjectId(id) } }, { new: true })
        .then((user) => {
        if (!user)
            res.status(400).json({ message: 'user not found' });
        res.status(200).json({ user });
    })
        .catch((err) => next(err));
});
router.delete('/:userId/favourites/:id', (req, res, next) => {
    const { userId, id } = req.params;
    User_1.default.findOneAndUpdate({ _id: userId }, { $pull: { favourites: mongoose_1.Types.ObjectId(id) } }, { new: true })
        .then((user) => {
        if (!user)
            res.status(400).json({ message: 'user not found' });
        res.status(200).json({ user });
    })
        .catch((err) => next(err));
});
exports.default = router;
//# sourceMappingURL=users.js.map