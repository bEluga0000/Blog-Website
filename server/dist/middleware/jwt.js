"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = 'sEcreTForYoU';
const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ err });
            }
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (typeof user === 'string') {
                return res.status(404).json({ message: 'USer is not valid' });
            }
            req.headers["userId"] = user.id;
            next();
        });
    }
    else {
        return res.status(401).json({ message: 'Header not set' });
    }
};
exports.authentication = authentication;
