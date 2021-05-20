import { Router, Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import User, { UserDocument } from '../models/User';

const router = Router();

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id)
    .then((user: UserDocument | null) => {
      if (!user) {
        res.status(400).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    })
    .catch((err: Error) => next(err));
});

router.get(
  '/:userId/favourites/',
  (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.userId)
      .populate({ path: 'favourites', populate: { path: 'user' } })
      .then((user) => {
        if (!user) {
          res.status(400).json({ message: 'User not found' });
          return;
        }
        console.log(user.favourites);

        res.status(200).json(user.favourites);
      })
      .catch((err: Error) => next(err));
  },
);

router.get(
  '/:userId/favourites/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const { userId, id } = req.params;

    User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { favourites: Types.ObjectId(id) } },
      { new: true },
    )
      .then((user) => {
        if (!user) res.status(400).json({ message: 'user not found' });
        res.status(200).json({ user });
      })
      .catch((err: Error) => next(err));
  },
);

router.delete(
  '/:userId/favourites/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const { userId, id } = req.params;

    User.findOneAndUpdate(
      { _id: userId },
      { $pull: { favourites: Types.ObjectId(id) } },
      { new: true },
    )
      .then((user) => {
        if (!user) res.status(400).json({ message: 'user not found' });
        res.status(200).json({ user });
      })
      .catch((err: Error) => next(err));
  },
);

export default router;
