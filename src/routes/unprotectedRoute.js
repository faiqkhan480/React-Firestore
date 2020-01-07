import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";

const UnProtectedRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                !currentUser ? (
                    <RouteComponent {...props} />
                ) : (
                    <Redirect to={"/profile"} />
                )
            }
        />
    );
};


export default UnProtectedRoute