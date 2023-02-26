import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return(
        auth?.user
        ? <Outlet/>
        : <Navigate to="/"/>
    );

    // return (
    //     auth?.roles?.find(role => allowedRoles?.includes(role))
    //         ? <Outlet />
    //         : auth?.user
    //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //             : <Navigate to="/login" state={{ from: location }} replace />
    // );
}

export default RequireAuth;