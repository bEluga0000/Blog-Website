import { selector } from "recoil";
import { userState } from "../atom/user";

export const userLoadingState = selector({
    key:'userLoadingState',
    get:({get})=>{
        const state =  get(userState)
        return state.isloading
    }
})