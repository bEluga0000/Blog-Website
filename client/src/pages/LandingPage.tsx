import { Button } from "@mui/material"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { usernameState } from "../store/selector/username"
export function LandingPage() {
    const navigate = useNavigate()
    const username = useRecoilValue(usernameState)
    return (
        <div style={{
            backgroundColor: '#', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100wh', padding: '1rem', gap: '4rem', textAlign: 'center'
            , height: '82vh', background: '#495E57', alignItems: 'center', color: 'whitesmoke'
        }}>
            <Typography variant="h3">
                Publish Your passions , your Way
            </Typography>
            <Typography>
                create a unique and beautiful blog easily.
            </Typography>
            {username &&
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Button variant="contained" color="warning"
                    onClick={()=>{
                        navigate('/blog/write')
                    }}>create</Button>
                    <Button variant="contained" color="warning"
                    onClick={()=>{
                        navigate('/home')
                    }}>Explore</Button>
                </div>
            }
            {
                !username &&
                <div style={{display:'flex',gap:'2rem'}}>
                    <Button variant="contained" color="warning"
                    onClick={()=>{
                        navigate('/signin')
                    }}>Signin</Button>
                    <Button variant="contained" color="warning"
                    onClick={()=>{
                        navigate('/home')
                    }}>Explore</Button>
                </div>
            }
        </div>
    )
} 