import { CircularProgress } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { MyBlogShow } from "../components/MyBlogShow"
import { userState } from "../store/atom/user"

export function MyBlogs() {
    const [blog, setBlog] = useState([])
    const [loading, isLoading] = useState(true)
    const user = useRecoilValue(userState)
    const navigate = useNavigate()
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
    if(user.isloading)
    {
        return <CircularProgress/>
    }
    else{
        if(!user.username)
        {
            navigate("/signin")
        }
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
    }
    