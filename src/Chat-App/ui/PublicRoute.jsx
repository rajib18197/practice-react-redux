import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser"

export default function PublicRoute({children}){
    const {user, isAuthenticated} = useUser();
    if(isAuthenticated) return <Navigate to={'/conversations'} />
    return children;
}