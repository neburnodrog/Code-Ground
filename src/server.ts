import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import connect from './db';
import config from './middleware';

dotenv.config();

const app: Application = express();
const port: number = 8000 || process.env.PORT;

config(app);

const db = process.env.MONGO_URI || 'mongodb://localhost/chess_DB';
connect(db);

import users from './routes/auth';
app.use('/users', users);

import chess from './routes/code-grounds';
app.use('/chess', chess);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
