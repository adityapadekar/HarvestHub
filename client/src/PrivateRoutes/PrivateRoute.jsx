import { useNavigate } from "react-router-dom";
import CheckRole from "../services/CheckRole";
export default function PrivateRoute({children}) {
    const navigate=useNavigate();
    const role=CheckRole();
    // console.log("role",role);
    if(role){
        return children;
    }

    return navigate("/login");

}
