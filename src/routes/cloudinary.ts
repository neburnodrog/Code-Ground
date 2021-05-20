import { Router, Response, Request, NextFunction } from 'express';
import { uploader, cloudinary } from '../config/cloudinary';
import User from '../models/User';

const router = Router();

router.post(
  '/new-pic/:id',
  uploader.single('pic'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }

    let { path } = req.file;
    const { filename: cloudinaryId, originalname } = req.file;

    path = cloudinary.url(cloudinaryId, {
      gravity: 'face',
      height: 200,
      width: 200,
      crop: 'thumb',
    });

    User.findByIdAndUpdate(req.params.id, {
      avatar: { cloudinaryId, path, originalname },
    })
      .then((oldUser) => {
        if (oldUser && oldUser.avatar !== null) {
          cloudinary.uploader.destroy(oldUser.avatar.cloudinaryId);
        }
        res.status(200).json({ path });
      })
      .catch((err) => next(err));
  },
);
export default router;
