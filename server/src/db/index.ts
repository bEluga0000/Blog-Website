import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:String,
    password:String
});
// I need to put required and default values here
const blogSchema = new mongoose.Schema({
    title:{type:String,default:'title'},
    description:String,
    content:String,
    published:{type:Boolean,default:false},
    userId:String,
    topic:{type:String,enum:['Technology','Data science','other'],default:'other'},
    createdAt:{type:Date,default:Date.now,immutable:true},
    updatedAt:{type:Date,default:Date.now}
})
export const Blog = mongoose.model('Blog',blogSchema);
export const User = mongoose.model('User',userSchema);
