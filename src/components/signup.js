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

    handleSubmit(event)  {
        event.preventDefault();
        const { name, email, password } = this.state;
        console.log(this.state, 'state------')
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                    res.user.updateProfile({
                        displayName: name
                    })
                        .then(() => {
                            this.setState({
                                name: '',
                                email: '',
                                password: '',
                            });
                            this.props.history.push('/profile');
                        })
            })
            .catch(err => {
                console.log(err, 'err-=-=-=-')
            })
    }



    render() {
        const { name, email, password } = this.state
        return (
            <Container className="wrapper">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="User Name" className="mr-sm-2">Name</Label>
                        <Input type="text" name="name" value={name} placeholder="something" onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Email" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" value={email} placeholder="something@idk.cool" onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Password" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" value={password} placeholder="don't tell!" onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
                <NavLink to='/login'>Already have an account</NavLink>
            </Container>
        );
    }
}

export default Signup