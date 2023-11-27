"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Blog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String
});
// I need to put required and default values here
const blogSchema = new mongoose_1.default.Schema({
    title: { type: String, default: 'title' },
    description: String,
    content: String,
    published: { type: Boolean, default: false },
    userId: String,
    topic: { type: String, enum: ['Technology', 'Data science', 'other'], default: 'other' },
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now }
});
exports.Blog = mongoose_1.default.model('Blog', blogSchema);
exports.User = mongoose_1.default.model('User', userSchema);
