import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../hooks/user_hook";

const roles = ['admin', 'user']

interface PrivateRouteProps {
    children: JSX.Element;
    isAuthenticated: boolean;
    allowedRoles: string[];
}

const hasRole = (role: string) => roles.includes(role);

const PrivateRoute = (props: PrivateRouteProps) => {
    let location = useLocation();
    const {isAuthenticated, children, allowedRoles} = props;

    const userRole = getUser();

    const hasAccess = isAuthenticated && allowedRoles.includes(userRole);

    if (!hasAccess) {
        return <Navigate to={"/"} state={{from:location}} replace />
    }

    return children;

}

export default PrivateRoute;