"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const productsRoutes_1 = __importDefault(require("./application/Products/productsRoutes"));
// config
const corsConfig = (0, cors_1.default)({
    origin: '*',
    allowedHeaders: 'Content-Type',
});
const PORT = 4000;
const app = (0, express_1.default)();
//error handler
function errorHandler(error, req, res, next) {
    const errMsg = { error: error.message };
    res.status(500).json(errMsg);
    next();
}
//middlewares
app.use(corsConfig);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// endpoints
app.use('/api/v1/products', productsRoutes_1.default);
app.use(errorHandler);
app.listen(PORT, () => {
    (0, dbConfig_1.default)();
});
