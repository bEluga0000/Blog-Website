import { Typography } from "@mui/material"
export function DispalyBlog({title,desc,date,content,published}){
    return(
        <div style={{width:'100wh',padding:'15px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="h3" style={{textTransform:'capitalize'}}>{title}</Typography>
            <div style={{textAlign:'right'}}>
                    <Typography variant="subtitle1" color={ "green"} style={{fontWeight:'700',fontStyle:'italic'}}>Created on</Typography>
                    <Typography variant="subtitle2">{date.substring(0,10)}</Typography>
                    {
                        published && <Typography variant="subtitle2">Published</Typography>
                    }
                    {
                        !published && <Typography variant="subtitle2" color={'red'}fontSize={'20px'}>Not Published</Typography>
                    }
                    
            </div>
            </div>
            <br />
            <Typography variant="h6">{desc}</Typography>
            
            <br />
            <Typography variant="subtitle2" style={{ lineHeight: '1.5',paddingBottom:'1rem' }}>
                {content}
            </Typography>
            <hr />
        </div>
    )
}