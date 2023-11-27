import { selector } from "recoil";
import { userState } from "../atom/user";

export const usernameState = selector({
    key:'usernameState',
    get:({get})=>{
        const state = get(userState)
        return state.username
    }
})