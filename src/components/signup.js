import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import firebase from "firebase";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <Container className="themed-container wrapper" fluid="sm">
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="User Name" className="mr-sm-2">Name</Label>
                        <Input type="text" name="name" placeholder="something" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Email" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" value={email} placeholder="something@idk.cool" onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Password" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" value={password} placeholder="don't tell!" onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <NavLink to='/login'>Already have an account</NavLink>
            </Container>
        );
    }
}

export default Signup