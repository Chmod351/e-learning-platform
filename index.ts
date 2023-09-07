const express = require('express');
const server = require('./config/dbConfig.ts')
const PORT: number = 5000;


const app = express();

app.listen(PORT, () => {
    server()
});
