import { Button, CircularProgress, Typography,Checkbox } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
export function UpdateBlog()
{
    const navigate = useNavigate()
    const[title,setTitle] = useState('')
    const[desc,setDesc] = useState('')
    const[content,setContent] = useState('')
    const[loading,setLoading] = useState(true)
    const[ischecked,setIsChecked] = useState(false)
    const [blogIds,setBlogId] = useState('')
    const {blogId} = useParams()
    const [publish,setPublish] = useState(false)
    const[isDisabled,setIsDisabled] = useState(true)
    useEffect(()=>{
        const blogInit = async()=>{
            
            const res = await axios.get(`http://localhost:3000/blog/myBlogs/${blogId}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("token")
                }
            })
            if (res.data.blog && res.data.blog.length > 0) {
                await setTitle(res.data.blog[0].title)
                await setDesc(res.data.blog[0].description)
                await setContent(res.data.blog[0].content)
                await setBlogId(res.data.blog[0]._id)
                if (res.data.blog[0].published) {
                    setPublish(true)
                    setIsChecked(true)
                }
                else {
                    setPublish(false)
                }
                setLoading(false)
            }
            
        }
        blogInit();
    },[])
    useEffect(() => {
        // Disable checkbox if any of the values is empty or has length less than 1
        setIsDisabled(!(title.length > 0 && desc.length > 0 && content.length > 0));
    }, [title, desc, content]);

    if(loading)
    {
        return <CircularProgress/>
    }
              return (
                <div style={{ width: '95%', padding: '1rem', position: 'absolute', minHeight: '100%' }}>
                    <div style={{ position: 'relative', left: '0rem' }}>
                        <Button variant="contained" 
                        id={blogIds} color="warning" style={{ borderRadius: '1rem', fontSize: '12px', padding: '1px'}}
                            onClick={async(e) => {
                                const blogidse = e.currentTarget.id 
                                const res = await axios.put(`http://localhost:3000/blog/myBlogs/${blogidse}`,{
                                    title,
                                    description:desc,
                                    content,

                                    published:ischecked
                                },{headers:{
                                    authorization:'bearer '+localStorage.getItem("token")
                                }}) 
                                if(res.data)
                                {
                                    navigate(`/preview/${blogidse}`)
                                }
                                else
                                {
                                    alert("U didnt did it")
                                }
                            }}
                        >Update</Button>
                          {!publish &&
                              <div>
                                  <Checkbox color="success" id="publish-check" style={{ display: 'inline' }} 
                                  checked={ischecked}
                                      disabled={isDisabled}
                                  onChange={(e)=>{
                                      setIsChecked(e.target.checked)
                                  }}/>
                                  <Typography variant="subtitle1" display={"inline"} color={isDisabled? 'grey':'green'} fontWeight={700}>Publish</Typography>
                                  <Typography variant="subtitle1" color={'red'}>!This Blog is not published if want to publish please check the box before you update</Typography>


                              </div>

                          }

                    </div>
                    <textarea
                        rows={2}
                        maxLength={20}
                        placeholder='Title..'
                        style={{
                            fontSize: '1.5rem', fontWeight: '700', justifyContent: 'center',
                            border: 'none',
                            outline: 'none', resize: 'none', width: '100%'
                        }}
                        value={title}
                        onChange={(e) => {

                            setTitle(e.target.value)
                            
                        }}

                    />
                    <textarea
                        placeholder='Discription..'
                        rows={2}
                        maxLength={20}
                        style={{
                            fontSize: '1.2rem', fontWeight: '500', justifyContent: 'center',
                            border: 'none',
                            outline: 'none', resize: 'none'
                        }}
                          value={desc}
                        onChange={(e) => {
                            setDesc(e.target.value)
                        }}

                    />
                    <hr />
                    <textarea
                        placeholder='Tell Your'
                        style={{
                            fontSize: '1rem', fontWeight: '300', justifyContent: 'center',
                            border: 'none',
                            outline: 'none', resize: 'none', width: '100%', height: '100%'
                        }}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}

                    />
                     
                </div>
            )
       
        
        
   
    
}