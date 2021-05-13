import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import passport from 'passport';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res
        .status(400)
        .json({ message: 'you must provide all the required fields' });
    } else if (password.length < 8) {
      res
        .status(400)
        .json({ message: 'your password has to be at least 8 chars long' });
    } else if (username === '') {
      res
        .status(400)
        .json({ message: 'The username field cannot remain be empty' });
    } else {
      const userFromDB = await User.findOne({ username: username });
      if (userFromDB !== null) {
        res.status(400).json({ message: 'This username is already taken' });
        return;
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
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
    }
  } catch (err) {
    res.json(err);
  }
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ message: 'Error while logging the user in', err });
    }

    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }

    req.login((user, err) => {
      if (err) {
        return res.status(500).json({ message: 'Error while logging in' });
      }

      return res.status(200).json(user);
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

export default router;
