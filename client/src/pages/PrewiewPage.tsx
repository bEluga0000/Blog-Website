import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Button, CircularProgress} from "@mui/material"
import { DispalyBlog } from "../components/DispalyBlog"
type BlogType = {_id:string;
    title:string;
    description:string;
    content:string;
    published:boolean;
    userId:string;
    topic:string;
    createdAt:string;
    updatedAt:string;
    __v:number
}
type BlogState = BlogType[]|null 

export function PreviewPage(){
    const [blog,setBlog] = useState<BlogState>(null)
    // const user = useRecoilValue(usernameState)
    const {blogId} = useParams()
    const navigate = useNavigate()
    // const user = useRecoilValue(usernameState)
        useEffect(()=>{
            const bloginit = async()=>{
                const res = await axios.get(`http://localhost:3000/blog/myBlogs/${blogId}`, {
                    headers: {
                        authorization:"bearer "+ localStorage.getItem("token")
                    }
                })
                if(res.data.blog)
                {
                   setBlog(res.data.blog) 
                }
            }
           bloginit();
           
           
        
        },[])
        
        if(!blog )
        {
            return <CircularProgress/>
        }
        else if(blog.length == 0)
        {
            return(
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
                    {blog.map((blogs)=>{
                        
                        return(
                            <div>
                                <DispalyBlog title={blogs.title} desc={blogs.description} date={blogs.createdAt} content={blogs.content} published={blogs.published}/>
                                <div style={{width:'100wh',alignItems:'center',display:'flex',justifyContent:'center',margin:'1rem'}}>
                                    <Button variant="contained" color="warning" style={{ borderRadius: '1rem', fontSize: '1rem', padding: '10px' }} id={blogs._id} onClick={(e)=>{
                                        const bId = e.currentTarget.id
                                        navigate(`/update/${bId}`)
                                    }}
                                    >Update</Button>
                                    <Button variant="outlined" color="error" style={{ borderRadius: '1rem', fontSize: '1rem', padding: '10px' }} id={blogs._id}
                                        onClick={async (e) => {
                                            const blogid = e.currentTarget.id
                                            const res = await axios.delete(`http://localhost:3000/blog/myBlogs/${blogid}`, {
                                                headers: {
                                                    authorization: "bearer " + localStorage.getItem("token")
                                                },
                                            })
                                            if (res.data) {
                                                alert('Blog Deleted successfylly')
                                                navigate('/home')
                                            }
                                            else {
                                                alert("there is error in the publisheing the")
                                            }
                                        }}>Delete</Button>
                                </div>
                                
                            </div>
                            
                        )
                    })}
                    
                </div>
                </>
            )
        }
        
    
}