import { Card, Typography ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ShowBlog({title,desc,created,blogId,topic})
{
    const navigate = useNavigate()
    return(
        <Card style={{ width: '100wh', padding: '15px',border:'1px solid black',margin:'.5rem',boxShadow:'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ cursor: 'pointer'}}id={blogId} onClick={(e)=>{
                    const clickedBlogId = e.currentTarget.id
                    navigate(`/DetailedBlog/${clickedBlogId}`)
                }}>
                <Typography variant="h4" style={{ textTransform: 'capitalize' }}>{title}</Typography>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" color={"green"} style={{ fontWeight: '700', fontStyle: 'italic' }}>Created</Typography>
                    <Typography variant="subtitle2">{created.substring(0,10)}</Typography>
                </div>
            </div>
            <hr />
            <Typography variant="subtitle1" style={{marginTop:'10px'}}>{desc}</Typography>
            <div>
                <Button variant="outlined" onClick={()=>{
                    navigate(`/blogs/t/${topic}`)
                }}>{topic}</Button>
            </div>
        </Card>
        
    )
}