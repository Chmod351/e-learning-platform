"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = __importDefault(require("./envConfig"));
const url = envConfig_1.default.MONGO_DB;
const connect = () => {
    mongoose_1.default.connect(url).then(() => {
        console.log('connected to db');
    }).catch((err) => {
        throw err;
    });
};
exports.default = connect;
