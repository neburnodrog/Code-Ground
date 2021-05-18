import Router, { Request, Response } from 'express';
import CodeGround from '../models/CodeGround';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  CodeGround.find()
    .sort({ createdAt: -1 })
    .populate('user')
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
    .then(() => res.status(200).json({ message: 'Code Ground deleted.' }))
    .catch((err) => res.status(400).json(err));
});

export default router;
