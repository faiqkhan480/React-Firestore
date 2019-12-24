import React, { Component } from 'react';
import firebase from "firebase";
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {NavLink} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event)  {
        event.preventDefault();
        const { email, password } = this.state;
        console.log(this.state, 'state------')
        this.setState({
            email: '',
            password: '',
        })
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {console.log(error, 'error on signin')})
    }

    render() {
        const { email, password } = this.state;
        return (
            <Container className="wrapper">
                <Form inline onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Email" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" value={email} placeholder="something@idk.cool" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Password" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password"  value={password} placeholder="don't tell!" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
                <NavLink to='/sign-up'>Don't have an account ?</NavLink>
            </Container>
        );
    }
}

export default Login