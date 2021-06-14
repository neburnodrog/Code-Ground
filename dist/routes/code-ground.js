"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const CodeGround_1 = __importDefault(require("../models/CodeGround"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default();
router.get('/', (req, res) => {
    CodeGround_1.default.find()
        .sort({ createdAt: -1 })
        .populate('user')
        .populate('creator')
        .then((codeGrounds) => res.status(200).json(codeGrounds))
        .catch((err) => res.status(400).json(err));
});
router.post('/', (req, res) => {
    const { title, user, html, css, js, forked, creator } = req.body;
    CodeGround_1.default.create({
        title,
        user,
        html,
        css,
        js,
        forked,
        creator,
    })
        .then((codeGround) => res.status(200).json(codeGround))
        .catch((err) => res.status(400).json(err));
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    CodeGround_1.default.findById(id)
        .then((codeGround) => {
        if (!codeGround) {
            res
                .status(400)
                .json({ message: `Code ground with id: ${id} not found` });
        }
        else {
            res.status(200).json(codeGround);
        }
    })
        .catch((err) => res.status(400).json(err));
});
router.put('/:id', (req, res) => {
    const { title, html, css, js } = req.body;
    CodeGround_1.default.findByIdAndUpdate(req.params.id, {
        title,
        html,
        css,
        js,
    }, { new: true })
        .then((codeGround) => res.status(200).json(codeGround))
        .catch((err) => res.status(400).json(err));
});
router.delete('/:id', (req, res) => {
    CodeGround_1.default.findByIdAndDelete(req.params.id)
        .then((ground) => res.status(200).json({ message: 'Code Ground deleted.', ground }))
        .catch((err) => res.status(400).json(err));
});
router.get('/user/:id', (req, res) => {
    User_1.default.findById(req.params.id)
        .then((user) => {
        if (user) {
            console.log(user);
            CodeGround_1.default.find({ user: user._id })
                .sort({ createdAt: -1 })
                .populate('user')
                .populate('creator')
                .then((codeGrounds) => {
                console.log(codeGrounds);
                res.status(200).json(codeGrounds);
            });
        }
        else {
            res.status(400).json({ message: 'user not found' });
        }
    })
        .catch((err) => res.status(400).json(err));
});
router.post('/fork/:userId', (req, res) => {
    const { userId } = req.params;
    CodeGround_1.default.create(Object.assign(Object.assign({}, req.body), { forked: true, user: userId }))
        .then((codeGround) => {
        if (!codeGround) {
            res.status(400).json({ message: `Code ground not created` });
        }
        else {
            res.status(200).json(codeGround);
        }
    })
        .catch((err) => res.status(400).json(err));
});
router.get('/:id/like/:userId', (req, res, next) => {
    const { userId, id } = req.params;
    CodeGround_1.default.findOneAndUpdate({ _id: id }, { $addToSet: { likes: mongoose_1.Types.ObjectId(userId) } }, { new: true })
        .then((ground) => {
        if (!ground)
            res.status(400).json({ message: 'Codeground not found' });
        else
            res.status(200).json({ message: 'Codeground liked' });
    })
        .catch((err) => next(err));
});
router.delete('/:id/like/:userId', (req, res, next) => {
    const { userId, id } = req.params;
    CodeGround_1.default.findOneAndUpdate({ _id: id }, { $pull: { likes: mongoose_1.Types.ObjectId(userId) } }, { new: true })
        .then((ground) => {
        if (!ground)
            res.status(400).json({ message: 'Codeground not found' });
        else
            res.status(200).json({ message: 'Codeground disliked' });
    })
        .catch((err) => next(err));
});
router.post('/:id/comments/:userId', (req, res, next) => {
    const { id, userId } = req.params;
    const { comment } = req.body;
    console.log({ id, userId });
    console.log({ comment });
    CodeGround_1.default.findOneAndUpdate({ _id: id }, { $addToSet: { comments: { comment, user: userId, likes: [] } } }, { new: true })
        .then((ground) => {
        console.log(ground);
        if (!ground)
            res.status(400).json({ message: 'Codeground not found' });
        else
            res.status(200).json({ message: 'Codeground commented' });
    })
        .catch((err) => next(err));
});
router.delete('/:id/comments/:commentId', (req, res, next) => {
    const { commentId, id } = req.params;
    CodeGround_1.default.findOneAndUpdate({ _id: id }, { $pull: { comments: { _id: commentId } } }, { new: true })
        .then((ground) => {
        if (!ground)
            res.status(400).json({ message: 'Codeground not found' });
        else
            res.status(200).json({ message: 'Comment deleted' });
    })
        .catch((err) => next(err));
});
exports.default = router;
//# sourceMappingURL=code-ground.js.map