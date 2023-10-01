import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';

const corsConfig = cors({
  origin: '*',
  allowedHeaders: 'Content-Type',
});
const sessionConfig = session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }, // true for HTTPS
});

export default function middlewares(app: Application) {
  app.use(corsConfig);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(sessionConfig);
}
