import 'reflect-metadata'
import express from 'express'
// import cors from 'cors'
import server from './config/dbConfig'
// import products from './application/Products/productsRoutes'



// config
const PORT: number = 5000;
const app = express();

//middlewares
// app.use(cors())

// routes
// app.use('/api/v1/products',products)

app.listen(PORT, () => {
    server()
});
