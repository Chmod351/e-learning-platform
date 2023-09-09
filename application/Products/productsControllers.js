"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productsServices_1 = __importDefault(require("./productsServices"));
const mongoose_1 = __importDefault(require("mongoose"));
class ProductController {
    findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productsServices_1.default.findAll();
                res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findByQuery(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.query;
                if (!query) {
                    return res.status(400).json({ error: 'Missing query parameter' });
                }
                const products = yield productsServices_1.default.findByQuery(query);
                res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.status(400).json('Missing id parameter');
            }
            else if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID' });
            }
            try {
                const product = yield productsServices_1.default.findById(id);
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, image_url, price } = req.body;
            try {
                const createdProduct = yield productsServices_1.default.createProduct({
                    name,
                    description,
                    image_url,
                    price,
                });
                res.json(createdProduct);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { name, description, image_url, price } = req.body;
            if (!id) {
                res.status(400).json('Missing id parameter');
            }
            else if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID' });
            }
            try {
                const updatedProduct = yield productsServices_1.default.updateProduct(id, {
                    name,
                    description,
                    image_url,
                    price,
                });
                res.status(200).json(updatedProduct);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.status(400).json('Missing id parameter');
            }
            else if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID' });
            }
            try {
                const deletedProduct = yield productsServices_1.default.deleteProduct(id);
                res.status(200).json(deletedProduct);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
const productController = new ProductController();
exports.default = productController;
// if i have more time , i'll prefer move the id check to a middleware to improve readability and apply backend pagination to getAll endpoint
