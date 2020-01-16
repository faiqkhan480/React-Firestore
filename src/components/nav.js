import React, { Component } from "react";
import {Button, Container, Dropdown, Navbar} from "react-bootstrap";
import fire from "../config/firebase";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            status: false
        }
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({status: true})
            }
        })
    }

    handleLogout() {
        fire.auth().signOut();
    }

    render() {
        const { status } = this.state
        return(
            <Container className="menu">
                <Navbar>
                    <Navbar.Brand href="#" className="brand">Timbuktu</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        { status ?
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="info"
                                    className="outlined-button"
                                    style={{
                                        backgroundColor: "white"
                                    }}
                                >
                                    {/*<FontAwesomeIcon size="2x" style={{color: '#679db7'}} icon={faUserCircle} />*/}
                                    User
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.handleLogout.bind(this)}>Sign-Out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            :
                            <Navbar.Text>
                                <NavLink className="outlined-button text-decoration-none pt-2 pb-2 pl-3 pr-3" to="/login" variant="outline-info" >
                                    Signed in:
                                </NavLink>
                            </Navbar.Text>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

export default Menu