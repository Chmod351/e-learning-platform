import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const corsConfig = cors({
  origin: '*',
  allowedHeaders: 'Content-Type',
});

export default function middlewares(app: Application) {
  app.use(corsConfig);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
}
