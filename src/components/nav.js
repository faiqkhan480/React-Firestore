import React, { Component } from "react";
import {Button, Container, Navbar} from "react-bootstrap";
import fire from "../config/firebase";

class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            status: "Signed in:"
        }
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({status: user.displayName})
            }
        })
    }

    render() {
        const { status } = this.state
        return(
            <Container className="menu">
                <Navbar>
                    <Navbar.Brand href="#" className="brand">Timbuktu</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button className="outlined-button" variant="outline-info" >
                                {status}
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

export default Menu