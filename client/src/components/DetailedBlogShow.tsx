import { Typography } from "@mui/material"
export function DetailedBlogShow({blogs})
{
    return(
        <div style={{display:'flex',width:'70%',flexDirection:'column',gap:'1rem'}}>
            <div>
                {
                    blogs.title.length > 0 && <Typography variant="h3" fontWeight={700}>
                        {blogs.title}
                    </Typography>
                }
                {
                    blogs.title.length <= 0 && <Typography variant="h3" fontWeight={700} color={'grey'}>
                        No content
                    </Typography>
                }
                <hr />
            </div>
            <div>
                {
                    blogs.description.length > 0 && <Typography variant="h6" fontWeight={600}>{blogs.description}</Typography>
                }
                {
                    blogs.description.length <=0 &&
                    <Typography variant="h6" fontWeight={600} color={'grey'}>No description</Typography>
                }
                <Typography variant="h6" fontWeight={600} marginTop={'10px'}> <span style={{ display: 'inline-block', marginRight: '5px' }}>&bull;</span>Created on : {blogs.createdAt.substring(0,10)}</Typography>
                <Typography variant="h6" fontWeight={600} marginTop={'10px'}> <span style={{ display: 'inline-block', marginRight: '5px' }}>&bull;</span>Topic : {blogs.topic}</Typography>
            </div>
            <div>
                {
                    blogs.content.length > 0 && <Typography variant="subtitle1" lineHeight={2}>{blogs.content}</Typography>
                }
                {
                    blogs.content.length <= 0 && <Typography variant="subtitle1" lineHeight={2} color={'grey'}>No content</Typography>
                }
                
            </div>
        </div>
    )
}