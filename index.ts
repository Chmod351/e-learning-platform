import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import server from './config/dbConfig';
import products from './application/Products/productsRoutes';

// config
const corsConfig = cors({
  origin: '*',
  allowedHeaders: 'Content-Type',
});
const PORT: number = 4000;
const app = express();

//middlewares
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints
app.use('/api/v1/products', products);

app.listen(PORT, () => {
  server();
});
