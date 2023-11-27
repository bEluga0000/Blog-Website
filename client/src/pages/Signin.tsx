import { Card, Typography, TextField, Button } from "@mui/material";
import { Eye ,EyeOff} from 'lucide-react';
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export function Signin() {
    const [showPassword, setShowPassword] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const showPasswordHandel=  ()=>{
        setShowPassword(!showPassword)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100vw', height: '100vh', justifyContent: 'center' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem .5rem' }}>
                <Typography variant="h4">
                    Welcome Back  To BloGoo
                </Typography>
                <Typography variant="h6">Sigin To expirence more</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <TextField label="Username" variant="outlined"
                        onChange={(e) => {

                            if (e.target.value.length >= 4) {
                                setValidUsername(true)
                                setUsername(e.target.value)
                            }
                        }} />

                    <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type={showPassword ? 'password' : 'text'} style={{ display: 'inline', borderRight: '1px solid black', outline: 'none' }}
                            onChange={(e) => {

                                if (e.target.value.length >= 8) {
                                    setValidPassword(true)
                                    setPassword(e.target.value)
                                }
                            }} />
                        <div style={{ display: 'inline', marginLeft: '-10', cursor: 'pointer' }}>
                            {
                                showPassword ? <EyeOff onClick={showPasswordHandel} />:<Eye onClick={showPasswordHandel}/>
                                    
                            }

                        </div>

                    </div>
                    <Typography variant="subtitle1">New to website? <Link to="/signup">SignUp</Link></Typography>
                    <Button variant="contained" color="secondary"
                        onClick={async () => {
                            if (!validUsername || !validPassword) {
                                alert('Wrong credentials')
                            }
                            else {

                                const res = await axios.post(`http://localhost:3000/user/signin`, {
                                    username,
                                    password
                                })
                                if (res.data.token) {
                                    localStorage.setItem('token', res.data.token)
                                    window.location.href = "/home";
                                }
                                else {
                                    alert(res.data.message)
                                }
                            }

                        }
                        }
                    >Sign In</Button>
                </div>
            </Card>
        </div>
    )
}