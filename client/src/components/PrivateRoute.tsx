import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameState } from "../store/selector/username";

export function PrivateRoute({ children }) {
    const user = useRecoilValue(usernameState);
    return user ? children
    : 
        <Navigate to="/signin" replace />
    
}
