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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const jwt_1 = require("../middleware/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authvariable_1 = require("../zodVariables/authvariable");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = authvariable_1.authVariables.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(401).json({ message: 'Wrong Inputs' });
    }
    else {
        const { username, password } = parsedInput.data;
        const user = yield db_1.User.findOne({ username });
        if (user) {
            res.status(401).json({ message: 'User alredy exist' });
        }
        else {
            const newUser = new db_1.User({ username, password });
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, jwt_1.secretKey, { expiresIn: '1h' });
            yield newUser.save();
            res.status(201).json({ message: 'User Created successfully', token });
        }
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = authvariable_1.authVariables.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(401).json({ message: 'Wrong credentials' });
    }
    else {
        const { username, password } = parsedInput.data;
        const user = yield db_1.User.findOne({ username, password });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, jwt_1.secretKey, { expiresIn: '1h' });
            res.status(201).json({ message: 'User signed in successfully', token });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}));
router.get('/me', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    console.log(userId);
    const user = yield db_1.User.findById(userId);
    if (user) {
        res.status(201).json({ username: user.username });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}));
exports.default = router;
