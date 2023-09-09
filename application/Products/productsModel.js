"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
    },
    description: {
        type: String,
        required: [true, "The description is required"],
    },
    image_url: {
        type: String,
        required: [true, "The image_url is required"],
    },
    price: {
        type: Number,
        required: [true, "The price is required"]
    }
}, { timestamps: true });
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;
