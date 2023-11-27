"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
const Blogs_1 = __importDefault(require("./routes/Blogs"));
const auth_1 = __importDefault(require("./routes/auth"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/blog', Blogs_1.default);
app.use('/user', auth_1.default);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
mongoose_1.default.connect('mongodb+srv://shreyas302005:Nothing69@cluster0.jkaesew.mongodb.net/', { dbName: "Blog" }).then(() => console.log('Connected!'));
