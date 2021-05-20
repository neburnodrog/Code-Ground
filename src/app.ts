require('dotenv/config');
require('./db');
import express from 'express';
import process from 'process';
import path from 'path';

/** APP CONFIG */
const app = express();
import config from './config';
config(app);

/** SESSION */
import session from 'express-session';
import MongoStore from 'connect-mongo';

const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost/code_ground';

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'alohomora',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: DB_URL,
    }),
  }),
);

import passport from './config/passport';
passport(app);

// ROUTES
import codeGround from './routes/code-ground';
app.use('/api/code-ground', codeGround);
import auth from './routes/auth';
app.use('/api/auth', auth);
import cloudinary from './routes/cloudinary';
app.use('/api/cloudinary', cloudinary);
import users from './routes/users';
app.use('/api/users', users);

// app.use(express.static(path.join(__dirname, '/client')));

// app.use((req, res) => {
//   res.sendFile(__dirname + '/client/index.html');
// });

import handleErrors from './error-handling';
handleErrors(app);

export default app;
