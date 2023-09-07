const express = require('express');
const server = require('./config/dbConfig.ts')
const cors= require('cors')


// config
const PORT: number = 5000;
const app = express();

//middlewares
app.use(cors())

app.listen(PORT, () => {
    server()
});
