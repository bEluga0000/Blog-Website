import { atom } from "recoil";

export const userState = atom<{isloading:boolean,username:string|null}>({
    key:'userState',
    default:{
        isloading:true,
        username:null
    }
})