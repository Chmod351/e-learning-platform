import 'reflect-metadata';
import express, { Application, Response, NextFunction, Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import server from './config/dbConfig';
import products from './application/Products/productsRoutes';

// config
const corsConfig = cors({
  origin: '*',
  allowedHeaders: 'Content-Type',
});
const PORT: number = 4000;
const app: Application = express();

//error handler
function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errMsg: object = { error: error.message };

  res.status(500).json(errMsg);

  next();
}

//middlewares
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// endpoints
app.use('/api/v1/products', products);

app.use(errorHandler);

app.listen(PORT, () => {
  server();
});
