import { CircularProgress } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { ShowBlog } from "../components/ShowBlog"

export function Home()
{
    const [isloading,setIsLoading] = useState(true)
    const[blog,setBlog] = useState([])
    useEffect(()=>{
        const blogInit = async()=>{
            const res =await axios.get('http://localhost:3000/blog')
            if(res.data.blogs && res.data.blogs.length > 0)
            {
                setBlog(res.data.blogs)
                setIsLoading(false)
            }
            else
            {
                setIsLoading(false)
                alert("there is some issue in please refresh")
            }
        } 
        blogInit()
    },[])
    if(isloading)
    {
        return <CircularProgress/>
    }
    else if (blog.length == 0) {
        return (
            <div>
                <div>There is no such blog is there</div>
            </div>
        )
    }
    else
    {
        return (
            <>
            <div>
                {blog.map((b) => {
                    return (
                        <ShowBlog title={b.title} desc={b.description} created={b.createdAt} blogId={b._id} topic={b.topic}
                    />)
                    
                })}

            </div>
            </>
        )
    }
    
}
