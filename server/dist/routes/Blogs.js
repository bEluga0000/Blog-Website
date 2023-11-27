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
const blogVariables_1 = require("../zodVariables/blogVariables");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const selectedFields = ['title', 'description', 'createdAt', 'updatedAt', 'topic'];
    const blogs = yield db_1.Blog.find({ published: true }).select(selectedFields);
    if (blogs) {
        res.status(201).json({ blogs });
    }
    else {
        res.status(404).json({ messge: 'blogs not found' });
    }
}));
router.get('/:blogId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    const blog = yield db_1.Blog.findById(blogId);
    if (blog) {
        res.status(201).json({ blog });
    }
    else {
        res.status(404).json({ message: 'Blog not found' });
    }
}));
router.get('/t/:topic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = req.params.topic;
    console.log(topic);
    const blogs = yield db_1.Blog.find({ topic, published: true });
    if (blogs) {
        res.status(202).json({ blogs });
    }
    else {
        res.status(404).json({ message: 'blogs not found' });
    }
}));
router.post('/write', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInputs = blogVariables_1.blogInputs.safeParse(req.body);
    if (!parsedInputs.success) {
        return res.status(401).json({ message: 'Wrong Inputs' });
    }
    const { title, description, content, topic, published } = parsedInputs.data;
    const newBlog = {
        title,
        description,
        content,
        userId: req.headers["userId"],
        published,
        topic
    };
    const blog = yield new db_1.Blog(newBlog);
    yield blog.save();
    const blogId = blog._id;
    console.log(blogId);
    res.status(202).json({ message: 'BLog created successfully', blogId });
}));
router.get('/myBlogs/all', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const blogs = yield db_1.Blog.find({ userId });
    if (blogs) {
        res.status(202).json({ blogs });
    }
    else {
        res.status(404).json({ message: 'blogs not found' });
    }
}));
router.get('/myBlogs/t/:topic', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = req.params.topic;
    const userId = req.headers["userId"];
    const blogs = yield db_1.Blog.find({ userId, topic });
    if (blogs) {
        res.status(202).json({ blogs });
    }
    else {
        res.status(404).json({ message: 'blogs not found' });
    }
}));
router.get('/myBlogs/published', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const publishedBLogs = yield db_1.Blog.find({ userId, published: true });
    if (publishedBLogs) {
        res.status(201).json({ publishedBLogs });
    }
    else {
        res.json(404).json({ message: 'There are no published Vlogs' });
    }
}));
router.get('/myBlogs/draft', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const draftedBlogs = yield db_1.Blog.find({ userId, published: false });
    if (draftedBlogs) {
        res.status(201).json({ draftedBlogs });
    }
    else {
        res.json(404).json({ message: 'There are no published Vlogs' });
    }
}));
router.get('/myBlogs/:blogId', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    const userId = req.headers['userId'];
    console.log(blogId, userId);
    if (!blogId) {
        res.status(404).json({ message: 'Blog not found' });
    }
    const blog = yield db_1.Blog.find({ userId, _id: blogId });
    if (blog) {
        res.status(201).json({ blog });
    }
    else {
        res.status(404).json({ message: 'There are no blog ' });
    }
}));
router.put('/myBlogs/:blogId', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    const userId = req.headers['userId'];
    const updatedFields = req.body;
    if (!blogId) {
        res.status(404).json({ message: 'Blog not found' });
    }
    if (!updatedFields) {
        res.status(401).json({ message: 'There is nothing to update' });
    }
    if ('createdAt' in updatedFields) {
        return res.status(400).json({ message: 'u cannot send the created date' });
    }
    if ('updatedAt' in updatedFields) {
        return res.status(400).json({ message: 'you cannot send the updated date' });
    }
    updatedFields.updatedAt = new Date();
    const blog = yield db_1.Blog.findOneAndUpdate({ userId, _id: blogId }, updatedFields, { new: true });
    if (blog) {
        res.status(201).json({ message: "Blog Updated Successfully" });
    }
    else {
        res.status(404).json({ message: 'There are no blog ' });
    }
}));
router.put('/myBlogs/publish/:blogId', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    const userId = req.headers['userId'];
    const blog = yield db_1.Blog.findOneAndUpdate({ userId, _id: blogId }, { published: true }, { new: true });
    if (blog) {
        res.status(201).json({ message: 'Blog Updated successfully', blogId: blog._id });
    }
    else {
        res.status(404).json({ message: 'BLog not found' });
    }
}));
router.delete('/myBlogs/:blogId', jwt_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const blogId = req.params.blogId;
    try {
        yield db_1.Blog.findOneAndDelete({ userId, _id: blogId });
        res.status(201).json({ message: 'Blog deleted successfully' });
    }
    catch (_a) {
        res.status(401).json({ messge: 'not able to delete the blog' });
    }
}));
exports.default = router;
