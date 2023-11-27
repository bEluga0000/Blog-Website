import { atom } from "recoil"

interface PageStateProps {
    signInPage: boolean;
    signUpPage: boolean;
    createBlogPage: boolean;
}
export const  pagesState = atom<PageStateProps>({
    key:'pageState',
    default:{
        signInPage: false,
        signUpPage: false,
        createBlogPage: false
    }
})