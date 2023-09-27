import 'reflect-metadata';
import express, { Application } from 'express';
import server from './config/dbConfig';
import products from './application/Products/productsRoutes';
import middlewares from './middlewares/middlewares';
import errorHandler from './helpers/errorHandler';

// config
const PORT: number = 4000;
const app: Application = express();

middlewares(app);

// endpoints
app.use('/api/v1/products', products);

app.use(errorHandler);

app.listen(PORT, () => {
  server();
});
