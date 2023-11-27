import { Album,LogOut,PenSquare,Pin ,BookCheck} from "lucide-react"
import { useNavigate } from "react-router-dom"
export function UserOptions(){
    const navigate = useNavigate()
    return(
        <div style={{display:'flex' , width:'80%',justifyContent:'flex-start',padding:'30px',flexDirection:'column',gap:'1.5rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'3rem',fontSize:'2rem',cursor:'pointer'}}
            onClick={()=>{
                navigate('/u/myBlogs')
            }}>
                <Album />
                My blogs
            </div>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontSize: '2rem', cursor: 'pointer'}}>
                <Pin />
                Pinned Blogs
            </div>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontSize: '2rem', cursor: 'pointer' }} onClick={()=>{
                navigate('/u/myblogs/draft')
            }}>
                <PenSquare />
                Drafted blogs
            </div>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontSize: '2rem', cursor: 'pointer' }} onClick={()=>{
                navigate('/u/myBlogs/published')
            }}>
                <BookCheck />
                Published blogs
            </div>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontSize: '2rem', cursor: 'pointer' }}>
                <LogOut />
                LogOut
            </div>
            <hr />
        </div>
    )
}