import React, { useContext, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";


const ProtectedRoute = ({Component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>
            !!currentUser ? (
                <RouteComponent {...props}/>
            ) : (
                <Redirect to={"/"} />
            )
        }/>
    )
}

export default ProtectedRoute