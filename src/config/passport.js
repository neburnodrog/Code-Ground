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
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log('error in passport.js line 26', err);
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Wrong Cretentials' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
