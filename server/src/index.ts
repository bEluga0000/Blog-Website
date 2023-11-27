import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express()
const port = 3000;
import blogrouter from './routes/Blogs'
import userRouter from './routes/auth'
app.use(cors())
app.use(express.json())
app.use('/blog',blogrouter)
app.use('/user',userRouter)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`)
})
const mongooseDBURL:string|undefined = process.env.MONGOOSE_CONNECT_KEY
if(!mongooseDBURL)
{
  console.log('please add the mongoose url in your .env file')
}
else
{
  mongoose.connect(mongooseDBURL, { dbName: "Blog" }).then(() => console.log('Connected!'))

}
