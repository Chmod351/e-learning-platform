"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const env = {
    MONGO_DB: process.env.MONGO,
};
exports.default = env;
