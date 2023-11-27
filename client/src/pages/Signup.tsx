import { Card, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// import { BaseUrl } from "../urls/url";
export function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const[showPassword,setShowPassword] = useState(true)
    const showPasswordHandel = ()=>{
        setShowPassword(!showPassword)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100vw', height: '100vh', justifyContent: 'center' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem .5rem' }}>
                <Typography variant="h4">
                    Welcome to BloGoo
                </Typography>
                <Typography variant="h6">SignUp And Explore</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <TextField id="outlined-basic" label="Username" variant="outlined"
                        onChange={(e) => {

                            if (e.target.value.length >= 4) {
                                setValidUsername(true)
                                setUsername(e.target.value)
                            }
                        }} />
                    <div>
                    <TextField id="outlined-basic" label="Password" variant="outlined"
                    type={showPassword ? 'password' : 'text'}
                        onChange={(e) => {

                            if (e.target.value.length >= 8) {
                                setValidPassword(true)
                                setPassword(e.target.value)
                            }
                        }} />
                        <div style={{display:'inline',cursor:'pointer'}}>
                            {
                                showPassword ? <EyeOff onClick={showPasswordHandel} />:<Eye onClick={showPasswordHandel}/> 
                            }
                            
                        </div>
                    </div>
                    <Typography variant="subtitle1">Already have account? <Link to="/signin">SignIn</Link></Typography>
                    <Button variant="contained" color="secondary"
                        onClick={async () => {
                            if (!validUsername || !validPassword) {
                                alert('Wrong credentials')
                            }
                            else {
                                const res = await axios.post(`http://localhost:3000/user/signup`, {
                                    username,
                                    password
                                })
                                if (res.data.token) {
                                    localStorage.setItem('token', res.data.token)
                                    window.location.href = "/home";
                                }
                                else
                                {
                                    alert(res.data.message)
                                }
                            }

                        }
                        }
                    >SignUp</Button>
                </div>
            </Card>
        </div>
    )
}