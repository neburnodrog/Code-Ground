import Router, { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import CodeGround, { CodeGroundPopulated } from '../models/CodeGround';
import User from '../models/User';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  CodeGround.find()
    .sort({ createdAt: -1 })
    .populate('user')
    .populate('creator')
    .then((codeGrounds) => res.status(200).json(codeGrounds))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req: Request, res: Response) => {
  const { title, user, html, css, js, forked, creator } = req.body;

  CodeGround.create({
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

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  CodeGround.findById(id)
    .then((codeGround) => {
      if (!codeGround) {
        res
          .status(400)
          .json({ message: `Code ground with id: ${id} not found` });
      } else {
        res.status(200).json(codeGround);
      }
    })
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req: Request, res: Response) => {
  const { title, html, css, js } = req.body;

  CodeGround.findByIdAndUpdate(
    req.params.id,
    {
      title,
      html,
      css,
      js,
    },
    { new: true },
  )
    .then((codeGround) => res.status(200).json(codeGround))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req: Request, res: Response) => {
  CodeGround.findByIdAndDelete(req.params.id)
    .then((ground) =>
      res.status(200).json({ message: 'Code Ground deleted.', ground }),
    )
    .catch((err) => res.status(400).json(err));
});

router.get('/user/:id', (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        console.log(user);
        CodeGround.find({ user: user._id })
          .sort({ createdAt: -1 })
          .populate('user')
          .populate('creator')
          .then((codeGrounds) => {
            console.log(codeGrounds);
            res.status(200).json(codeGrounds);
          });
      } else {
        res.status(400).json({ message: 'user not found' });
      }
    })
    .catch((err) => res.status(400).json(err));
});

router.post('/fork/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  CodeGround.create({ ...req.body, forked: true, user: userId })
    .then((codeGround) => {
      if (!codeGround) {
        res.status(400).json({ message: `Code ground not created` });
      } else {
        res.status(200).json(codeGround);
      }
    })
    .catch((err) => res.status(400).json(err));
});

router.get(
  '/:id/like/:userId',
  (req: Request, res: Response, next: NextFunction) => {
    const { userId, id } = req.params;

    CodeGround.findOneAndUpdate(
      { _id: id },
      { $addToSet: { likes: Types.ObjectId(userId) } },
      { new: true },
    )
      .then((ground) => {
        if (!ground) res.status(400).json({ message: 'Codeground not found' });
        else res.status(200).json({ message: 'Codeground liked' });
      })
      .catch((err) => next(err));
  },
);

router.delete(
  '/:id/like/:userId',
  (req: Request, res: Response, next: NextFunction) => {
    const { userId, id } = req.params;

    CodeGround.findOneAndUpdate(
      { _id: id },
      { $pull: { likes: Types.ObjectId(userId) } },
      { new: true },
    )
      .then((ground) => {
        if (!ground) res.status(400).json({ message: 'Codeground not found' });
        else res.status(200).json({ message: 'Codeground disliked' });
      })
      .catch((err) => next(err));
  },
);

router.post(
  '/:id/comments/:userId',
  (req: Request, res: Response, next: NextFunction) => {
    const { id, userId } = req.params;
    const { comment } = req.body;

    console.log({ id, userId });
    console.log({ comment });

    CodeGround.findOneAndUpdate(
      { _id: id },
      { $addToSet: { comments: { comment, user: userId, likes: [] } } },
      { new: true },
    )
      .then((ground) => {
        console.log(ground);
        if (!ground) res.status(400).json({ message: 'Codeground not found' });
        else res.status(200).json({ message: 'Codeground commented' });
      })
      .catch((err) => next(err));
  },
);

router.delete(
  '/:id/comments/:commentId',
  (req: Request, res: Response, next: NextFunction) => {
    const { commentId, id } = req.params;

    CodeGround.findOneAndUpdate(
      { _id: id },
      { $pull: { comments: { _id: commentId } } },
      { new: true },
    )
      .then((ground) => {
        if (!ground) res.status(400).json({ message: 'Codeground not found' });
        else res.status(200).json({ message: 'Comment deleted' });
      })
      .catch((err) => next(err));
  },
);

export default router;
