"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsControllers_1 = __importDefault(require("./productsControllers"));
const routes = (0, express_1.Router)();
routes.get("/", productsControllers_1.default.findAll);
routes.get("/search", productsControllers_1.default.findByQuery);
routes.get("/:id", productsControllers_1.default.findById);
routes.post("/create", productsControllers_1.default.create);
routes.put("/update/:id", productsControllers_1.default.update);
routes.delete("/delete/:id", productsControllers_1.default.delete);
exports.default = routes;
