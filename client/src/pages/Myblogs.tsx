import { CircularProgress } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { MyBlogShow } from "../components/MyBlogShow"

export function MyBlogs() {
    const [blog, setBlog] = useState([])
    const [loading, isLoading] = useState(true)
    useEffect(() => {
        const blogInit = async () => {
            const res = await axios.get('http://localhost:3000/blog/myblogs/all', {
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token')
                }
            })
            if (res.data.blogs) {
                setBlog(res.data.blogs)
                isLoading(false)
            }
            else {
                alert('something went wrong')
                isLoading(false)
            }
        }
        blogInit()
    }, [])
    if (loading) {
        return <CircularProgress />
        
    }
    else {
        return (
            <div>
                {blog.map((b) => {
                    return (
                        <MyBlogShow title={b.title} desc={b.description} date={b.createdAt} published={b.published} bid={b._id} />
                    )

                })}
            </div>
        )
    }
}