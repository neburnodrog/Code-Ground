"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
        .then(() => res.status(200).json({ message: 'Code Ground deleted.' }))
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
exports.default = router;
//# sourceMappingURL=code-ground.js.map
