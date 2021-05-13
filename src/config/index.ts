import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import process from 'process';
import { Application } from 'express';

export default (app: Application): void => {
  app.set('trust proxy', 1);
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || 'http://localhost:3000',
    }),
  );
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
