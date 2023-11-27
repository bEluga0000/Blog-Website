import { useEffect, useState } from "react"
import axios from "axios"
// import { useState } from 'react';
import { Button } from "@mui/material"
import { useRecoilValue } from "recoil"
import { usernameState } from "../store/selector/username"
import { useNavigate } from "react-router-dom"
import { Signin } from "./Signin"
export function CreateBlog() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const user = useRecoilValue(usernameState)
    const [isDisabled, setIsDisabled] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        setIsDisabled(!(title.length>0 && desc.length >0 && content.length > 0))
    },[title,desc,content])
    const buttonHandler = async () => {
        const response = await axios.post('http://localhost:3000/blog/write', {
            title,
            description: desc,
            content
        },{
            headers:{
                authorization:'bearer '+localStorage.getItem('token')
            }
        })
        const data = response.data
        if(data.blogId)
        {
            navigate(`/preview/${data.blogId}`)
        }
        else
        {
            alert("Something went wrong")
        }
        
    }
    if(!user)
    {
        navigate('/singin') 
        return(

            <Signin/>
        )
    }
    else
    {
        return (
            <div style={{ width: '95%', padding: '1rem', position: 'absolute' ,minHeight:'100vh'}}>
                <div style={{ position: 'relative', left: '0rem' }}>
                    <Button variant="contained" color="warning" style={{ borderRadius: '1rem', fontSize: '12px', padding: '1px' }}
                        onClick={() => {
                            buttonHandler()
                        }}
                    >Draft</Button>
                    <Button variant="contained" color="success" style={{ borderRadius: '1rem', fontSize: '12px', padding: '1px' }} disabled={isDisabled} onClick={async()=>{
                        const response = await axios.post('http://localhost:3000/blog/write', {
                            title,
                            description: desc,
                            content,
                            published:true
                        }, {
                            headers: {
                                authorization: 'bearer ' + localStorage.getItem('token')
                            }
                        })
                        const data = response.data
                        if (data.blogId) {
                            navigate(`/preview/${data.blogId}`)
                        }
                        else {
                            alert("Something went wrong")
                        }

                    }}>Publish</Button>
                </div>
                <textarea
                    rows={2}
                    maxLength={20}
                    placeholder='Title..'
                    style={{
                        fontSize: '1.5rem', fontWeight: '700', justifyContent: 'center',
                        border: 'none',
                        outline: 'none',resize: 'none',width:'100%'
                    }}
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
                        outline: 'none', resize: 'none'
                    }}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}

                />
            </div>
        )
    }
    
    
}


