import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";


const ProtectedRoute = ({Component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    return(
        <Route {...rest} render={routeProps =>
            !!currentUser ? (
                <RouteComponent {...routeProps}/>
            ) : (
                <Redirect to={"/login"} />
            )
        }/>
    )
};

export default ProtectedRoute