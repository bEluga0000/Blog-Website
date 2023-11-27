import express from 'express'
import { Blog, User } from '../db'
import { authentication } from '../middleware/jwt'
import { blogInputs } from '../zodVariables/blogVariables'
const router = express.Router()

router.get('/',async (req,res)=>{
    const selectedFields = ['title','description','createdAt','updatedAt','topic']
    const blogs = await Blog.find({published:true}).select(selectedFields)
    if(blogs)
    {

        res.status(201).json({blogs})
    }
    else
    {
        res.status(404).json({messge:'blogs not found'})
    }
})
router.get('/:blogId',async(req,res)=>{
    const blogId = req.params.blogId 
    const blog = await Blog.findById(blogId)
    if(blog)
    {
        res.status(201).json({blog})
    }
    else
    {
        res.status(404).json({message:'Blog not found'})
    }
})
router.get('/t/:topic',async(req,res)=>{
    const topic = req.params.topic
    console.log(topic)
    const blogs = await Blog.find({topic,published:true})
    if(blogs)
    {
        res.status(202).json({blogs})
    }
    else
    {
        res.status(404).json({message:'blogs not found'})
    }
})

router.post('/write',authentication,async (req,res)=>{
    const parsedInputs = blogInputs.safeParse(req.body)
    if(!parsedInputs.success)
    {
        return res.status(401).json({message:'Wrong Inputs'})
    } 
    const {title,description,content,topic,published} =parsedInputs.data
    const newBlog = {
        title,
        description,
        content,
        userId:req.headers["userId"],
        published,
        topic
    }
    const blog = await new Blog(newBlog)
    await blog.save()
    const blogId = blog._id
    console.log(blogId)
    res.status(202).json({message:'BLog created successfully',blogId})
})


router.get('/myBlogs/all',authentication,async(req,res)=>{
    const userId = req.headers["userId"]
    const blogs = await Blog.find({userId})
    if(blogs)
    {
        res.status(202).json({blogs})
    }
    else
    {
        res.status(404).json({message:'blogs not found'})
    }
})


router.get('/myBlogs/t/:topic',authentication,async(req,res)=>{
    const topic = req.params.topic
    const userId = req.headers["userId"]
    const blogs = await Blog.find({userId,topic})
    if(blogs)
    {
        res.status(202).json({blogs})
    }
    else
    {
        res.status(404).json({message:'blogs not found'})
    }
})
router.get('/myBlogs/published',authentication,async(req,res)=>{
    const userId = req.headers["userId"]
    const publishedBLogs = await Blog.find({userId,published:true})
    if(publishedBLogs)
    {
        res.status(201).json({publishedBLogs})
    }
    else
    {
        res.json(404).json({message:'There are no published Vlogs'})
    }
})

router.get('/myBlogs/draft',authentication,async(req,res)=>{
    const userId = req.headers["userId"]
    const draftedBlogs = await Blog.find({userId,published:false})
    if(draftedBlogs)
    {
        res.status(201).json({draftedBlogs})
    }
    else
    {
        res.json(404).json({message:'There are no published Vlogs'})
    }
})

router.get('/myBlogs/:blogId',authentication,async(req,res)=>{
    const blogId = req.params.blogId
    const userId = req.headers['userId']
    console.log(blogId,userId)
    if(!blogId)
    {
        res.status(404).json({message:'Blog not found'})
    }
    const blog = await Blog.find({userId,_id:blogId})
    if(blog)
    {
        res.status(201).json({blog})
    }
    else
    {
        res.status(404).json({message:'There are no blog '})
    }
})
router.put('/myBlogs/:blogId',authentication,async(req,res)=>{
    const blogId = req.params.blogId
    const userId = req.headers['userId']
    const updatedFields = req.body
    if(!blogId)
    {
        res.status(404).json({message:'Blog not found'})
    }
    if(!updatedFields)
    {
        res.status(401).json({message:'There is nothing to update'})
    }
    if('createdAt' in updatedFields)
    {
        return res.status(400).json({message:'u cannot send the created date'})
    }
    if('updatedAt' in updatedFields)
    {
        return res.status(400).json({message:'you cannot send the updated date'})
    }
    updatedFields.updatedAt = new Date()
    const blog = await Blog.findOneAndUpdate({userId,_id:blogId},updatedFields,{new:true})
    if(blog)
    {
        res.status(201).json({message:"Blog Updated Successfully"})
    }
    else
    {
        res.status(404).json({message:'There are no blog '})
    }
})
router.put('/myBlogs/publish/:blogId',authentication,async(req,res)=>{
    const blogId = req.params.blogId
    const userId = req.headers['userId']
    const blog = await Blog.findOneAndUpdate({ userId, _id: blogId }, { published:true},{new:true})
    if(blog)
    {
        res.status(201).json({message:'Blog Updated successfully',blogId:blog._id})
    }
    else
    {
        res.status(404).json({message:'BLog not found'})
    }



})
router.delete('/myBlogs/:blogId',authentication,async (req,res)=>{
    const userId = req.headers["userId"]
    const blogId = req.params.blogId
    try{
        await Blog.findOneAndDelete({userId,_id:blogId})
        res.status(201).json({message:'Blog deleted successfully'})
    }
    catch
    {
        res.status(401).json({messge:'not able to delete the blog'})
    }
})
export default router