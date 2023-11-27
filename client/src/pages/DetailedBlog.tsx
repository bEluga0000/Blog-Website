import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailedBlogShow } from "../components/DetailedBlogShow";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export function DetailedBlog(){
    const {blogId} = useParams()
    const[isLoading,setIsLoading] = useState(false)
    const[blogs,setBlogs] = useState({})
    useEffect(()=>{
        const blogInit = async ()=>{
            const res = await axios.get(`http://localhost:3000/blog/${blogId}`)
            if(res.data.blog )
            {
                setIsLoading(true)
                setBlogs(res.data.blog)
                
            }
            else
            {
                alert("Something went wrong")
                setIsLoading(true)
            }
        }
        blogInit()
    },[blogId])
    if(!isLoading)
    {
        return <CircularProgress/>
    }
    else
    {
        return (
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
                <DetailedBlogShow blogs={blogs}/>
            </div>
        )
    }
    
}