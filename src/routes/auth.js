import React, { useEffect, useState, Component } from "react";
import fire from "../config/firebase";

export const AuthContext = React.createContext();

class AuthProvider extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ''
        }
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            this.setState({currentUser: user})
        });
    }

    render() {
        const {currentUser} = this.state
        return(
            <AuthContext.Provider
                value={{
                    currentUser
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthProvider