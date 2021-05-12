import express, { Application } from 'express';

const config = (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

export default config;
