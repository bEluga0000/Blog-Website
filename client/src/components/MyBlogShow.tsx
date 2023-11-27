import { Typography ,Button} from "@mui/material"
import { useNavigate } from "react-router-dom"
export function MyBlogShow({ bid,title, desc, date, published }) {
    const navigate = useNavigate()
    return (
        <div style={{ width: '100wh', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ cursor: 'pointer' }}  onClick={() => {
                    
                    navigate(`/DetailedBlog/${bid}`)
                }}>
                    {title.length > 0 && <Typography variant="h3" style={{ textTransform: 'capitalize' }} >{title}</Typography>}
                    {title.length <= 0 && <Typography variant="h3" style={{ textTransform: 'capitalize' }} color={'grey'}>No Content</Typography>}
                
                </div>
                {/* Need to do the things look grey */}
                <div style={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" color={"green"} style={{ fontWeight: '700', fontStyle: 'italic' }}>Created on</Typography>
                    <Typography variant="subtitle2">{date.substring(0, 10)}</Typography>
                    {
                        published && <Typography variant="subtitle2">Published</Typography>
                    }
                    {
                        !published && <Typography variant="subtitle2" color={'red'} fontSize={'20px'}>Not Published</Typography>
                    }
                </div>
            </div>
            <br />
            {
                desc.length > 0 && <Typography variant="h6">{desc}</Typography>
            }
            {
                desc.length <= 0 && <Typography variant="h6" color={'grey'}>No description</Typography>
            }
            

            <br />
            <Button color="warning" variant="contained" style={{marginBottom:'1rem'}} id={bid}
            onClick={(e)=>{
                const blid = e.currentTarget.id
                navigate(`/update/${blid}`)
            }}>Update</Button>
            <hr />
        </div>
    )
}