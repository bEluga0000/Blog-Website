import { Card, Typography, Button, CircularProgress } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atom/user";
import { userLoadingState } from "../store/selector/isuserLoading";
import { usernameState } from "../store/selector/username";
import { UserCheck } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { PenSquare } from "lucide-react";
export function AppBar() {
    const navigate = useNavigate()
    const username = useRecoilValue(usernameState)
    const userLoading = useRecoilValue(userLoadingState)
    const setUser = useSetRecoilState(userState)
    if (userLoading) {
        <CircularProgress />
    }
    if (username) {
        return (
            <Card style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center', height: '10vh' }}>
                <Button onClick={() => {
                    navigate('/home')
                }}
                >
                    <Typography variant="h3">BloGoo</Typography>
                </Button>
                <div style={{ display: 'flex', gap: '1rem', alignItems: "center" }}>
                    <div onClick={() => {
                        navigate('/blog/write')
                    }} style={{cursor:'pointer'}}>
                    <PenSquare />
                    </div>
                    <Button variant="contained" onClick={() => {
                        setUser({
                            isloading: false,
                            username: null
                        });
                        localStorage.setItem('token', "");
                        navigate('/')
                    }}>Logout</Button>
                    <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", borderRadius: '1rem', fontSize: '10px' }} variant="contained" color="secondary" onClick={()=>{
                        navigate('/u/useroptions')
                    }}>
                        <UserCheck />
                        {username}
                    </Button>
                </div>

            </Card>
        )
    }
    else {

        return (
            <Card style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', alignItems: 'center', height: '10vh' }}>
               <div style={{cursor:'pointer'}} onClick={() => {
                    navigate('/home')
                }}
                >
                    <Typography variant="h3">BloGoo</Typography>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="contained"
                    ><Link to='/signin'>Signin</Link></Button>
                    <Button variant="contained" ><Link to='/signup'>Signup</Link></Button>
                </div>
            </Card>
        )

    }

}