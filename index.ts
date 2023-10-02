import 'reflect-metadata';
import express, { Application } from 'express';
import server from './src/config/dbConfig';
import products from './src/application/Products/productsRoutes';
import customer from './src/application/Users/Customers/customersRoutes';
import middlewares from './src/middlewares/middlewares';
import errorHandler from './src/helpers/errorHandler';

// config
const PORT: number = 4000;
const app: Application = express();

middlewares(app);

// endpoints
app.use('/api/v1/products', products);
app.use('/api/v1/customer', customer);

app.use(errorHandler);

app.listen(PORT, () => {
  server();
  console.log(`app running on http://localhost:${PORT}`);
});
