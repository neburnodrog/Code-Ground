/** PASSPORT */
import User from '../models/User';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

export default (app) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((dbUser) => {
        done(null, dbUser);
      })
      .catch((err) => {
        done(err);
      });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });

        if (user === null || !bcrypt.compareSync(password, user.password)) {
          done(null, false, { message: 'Wrong Credentials Provided!' });
        } else {
          done(null, user);
        }
      } catch (err) {
        done(err);
      }
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
