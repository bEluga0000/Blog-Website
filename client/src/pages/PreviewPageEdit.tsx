import { Grid, Typography,Button,InputLabel,Select,MenuItem } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export function PreviewComponent({stitle,sdesc,scontent}) {
    const navigate = useNavigate()
    const [title,setTitle] = useState('afd')
    const[desc,setDesc] = useState('sdfg')
    const[topic,setTopic] =useState('other')
    const[isDisabled,setDisabled] = useState(true)
    useEffect(()=>{
        setDisabled(!(title.length > 0 && desc.length > 0 && topic.length > 0))
    },[title,desc,topic])
    return (
        <div style={{display:'flex',minHeight:'88vh',border:'1px solid black',justifyContent:'center',width:'100wh',alignItems:'center'}} >
            <Grid container spacing={3} xs={10} border={'1px solid black'} minHeight={'80vh'} padding={'.5rem'}>
                <Grid item lg={6} xs={12} md={6} display={'flex'} flexDirection={'column'}  gap={'3rem'} padding={'.2rem'}>
                <Typography variant="h2">Story Preview</Typography>
                    <textarea
                        rows={2}
                        maxLength={20}
                        placeholder='Title..'
                        style={{
                            fontSize: '1.2rem', fontWeight: '700', justifyContent: 'center',
                            border: 'none',
                            outline: 'none', resize: 'none', width: '100%', borderBottom: '1px solid grey'
                        }}
                        value={title}
                        onChange={(e) => {
                                setTitle(e.target.value)
                        }}

                    />
                    <textarea
                        placeholder='Write a preview subtitle'
                        rows={2}
                        maxLength={20}
                        style={{
                            fontSize: '1.2rem', fontWeight: '500', justifyContent: 'center',
                            border: 'none',
                            outline: 'none', resize: 'none'
                        ,borderBottom:'1px solid grey'}}
                        value={desc}
                        onChange={(e) => {
                            setDesc(e.target.value)
                        }}

                    />
            </Grid>
                <Grid item lg={6} xs={12} md={6} display={'flex'} flexDirection={'column'} gap={'3rem'}>
                    <Typography>Publishing To : <span style={{fontWeight:'800' ,fontSize:'1.2rem'}}>Username</span></Typography>
                    <InputLabel>select the topic of ur story</InputLabel>
                    <Select                      
                        label="Topic"
                        onChange={(e)=>{
                            setTopic(e.target.value)
                        }}
                        defaultValue={'other'}
                    >
                        <MenuItem value={'Technology'}>Technology</MenuItem>
                        <MenuItem value={'Data science'}>Data Science</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                    </Select>
                        
                    <Typography>Add or change topics so readers know what your story is about</Typography>
                    <Button variant="outlined" disabled={isDisabled} onClick={async () => {
                        const response = await axios.post('http://localhost:3000/blog/write', {
                            title,
                            description: desc,
                            content:scontent,
                            published: true
                        }, {
                            headers: {
                                authorization: 'bearer ' + localStorage.getItem('token')
                            }
                        })
                        const data = response.data
                        if (data.blogId) {
                            navigate(`/u/myblogs`)
                        }
                        else {
                            alert("Something went wrong")
                        }

                    }}>Publish now</Button>
                </Grid>
        </Grid>
        </div>
    )
}