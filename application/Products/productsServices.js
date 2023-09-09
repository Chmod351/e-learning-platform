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
const productsRepository_1 = __importDefault(require("../../repositories/productsRepository"));
class ProductServices {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsRepository_1.default.findAll();
        });
    }
    findByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                ],
            };
            return yield productsRepository_1.default.findByQuery(q);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsRepository_1.default.findById(id);
        });
    }
    createProduct(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsRepository_1.default.create(body);
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsRepository_1.default.update(id, product);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsRepository_1.default.delete(id);
        });
    }
}
const productService = new ProductServices();
exports.default = productService;
