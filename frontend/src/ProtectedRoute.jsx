import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const { loading , isAuthenticated} = useSelector((state) => state.user)
   if(loading === fasle){
     if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    return children
   }
}
export default ProtectedRoute;