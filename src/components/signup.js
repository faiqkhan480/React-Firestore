import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, NavLink, Container} from 'reactstrap';


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
                        <Input type="email" name="email" placeholder="something@idk.cool" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Password" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" placeholder="don't tell!" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <NavLink href="#">Already have an account</NavLink>
            </Container>
        );
    }
}

export default Signup