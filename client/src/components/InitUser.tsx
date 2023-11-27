import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atom/user";
import axios from "axios";

export function InitUser(){
    const setUser = useSetRecoilState(userState);
    useEffect(()=>{
        const init = async()=>{
            try{
                const res = await axios.get('http://localhost:3000/user/me',{
                    headers:{
                        Authorization:"Bearer " + localStorage.getItem("token")
                    }
                })
                if(res.data.username)
                {
                    setUser({
                        isloading:false,
                        username:res.data.username
                    })
                }
                else
                {
                    setUser({
                        isloading:false,
                        username:null
                    })
                }
            }
            catch(e){
                setUser({
                    isloading:false,
                    username:null
                })
            }
        }
        init()
    },[])
    return <></>
}