import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import Svg from "./svg";
import {NavLink} from "react-router-dom";

class Home extends Component{
    render() {
        return(
            <div className="banner d-flex justify-content-center align-items-center mb-5">
                <Container className=" d-flex align-items-center flex-column">
                    <NavLink to="/profile">
                        <p className="display-3 display-sm-4 effect-underline">List Your Todos...</p>
                    </NavLink>
                    <Svg/>
                </Container>

            </div>
        )
    }
}

export default Home