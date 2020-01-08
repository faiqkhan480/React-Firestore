import React, { Component } from "react";
import {Button, Container, Navbar} from "react-bootstrap";

class Menu extends Component{
    render() {
        return(
            <Container className="menu">
                <Navbar>
                    <Navbar.Brand href="#" className="brand">Timbuktu</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button className="outlined-button" href="#/login" variant="outline-info" >
                                Signed in:
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

export default Menu