import { Typography ,CircularProgress} from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ShowTopicBlog } from "../components/ShowTopicBlog"
export function TopicBlogPage()
{
    const [loading,setLoading] = useState(true)
    const [blog,setBlog] = useState([])
    const {topic} = useParams()
    useEffect(()=>{
        const blogInit=async ()=>{
            const res =await axios.get(`http://localhost:3000/blog/t/${topic}`)
            if(res.data.blogs && res.data.blogs.length > 0)
            {
                setBlog(res.data.blogs)
                setLoading(false)
            }
            else
            {
                alert('SOmething went wrong')
                setLoading(false)
            }
        }
        blogInit()
    },[])
    if(loading)
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
    else{
    return(
        <div>
        <div>
            <Typography>Blog based on <b style={{fontSize:'2rem'}}>{topic}</b></Typography>
        </div>
            {blog.map((b) => {
                return (
                    <ShowTopicBlog title={b.title} desc={b.description} created={b.createdAt} blogId={b._id} 
                    />)

            })}
        </div>
    )
        }
}