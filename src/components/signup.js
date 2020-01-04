import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import { NavLink } from 'react-router-dom'
// import firebase, {Firestore as db} from "firebase";
import fire, { db } from "../config/firebase";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event)  {
        event.preventDefault();
        const { name, email, phone, password } = this.state;
        console.log(this.state, 'state------')
        const promise = fire.auth().createUserWithEmailAndPassword(email, password);
        promise.then( async (res) => {
                    await res.user.updateProfile({
                        displayName: name
                    });
            })
            .catch(err => {
                console.log(err, 'err-=-=-=-')
            });
        promise.then(() => {
            const userUid = fire.auth().currentUser.uid
            const userRef = db.collection("Data").doc(userUid);
            userRef.set({
                name: name,
                email: email,
                phone: phone,
            });
            this.props.history.push('/profile');
        })

    }

    addUserInfo(uid) {
         console.log(uid, 'addUserInfo=-=-=-')
    }

    setValues() {
        this.setState({
            name: '',
            email: '',
            phone: '',
            password: '',
        })
    }



    render() {
        const { name, email, phone, password } = this.state
        return (
            <div className="wrapper">
                <Form className="mb-4 container" onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup className="container">
                        <Row>
                            <Col md="2" sm="2">
                                <Label for="Name">Name</Label>
                            </Col>
                            <Col md="10" sm="10">
                                <Input className="fields" type="text" name="name" value={name} placeholder="something" onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup className="container">
                        <Row>
                            <Col md="2" sm="2">
                                <Label for="Email">Email</Label>
                            </Col>
                            <Col md="10" sm="10">
                                <Input className="fields" type="email" name="email" value={email} placeholder="something@example.com" onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup className="container">
                        <Row>
                            <Col md="2" sm="2">
                                <Label for="Phone">Phone</Label>
                            </Col>
                            <Col md="10" sm="10">
                                <Input className="fields" type="phone" name="phone" value={phone} placeholder="+92-6546545" onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup className="container">
                        <Row>
                            <Col md="2" sm="2">
                                <Label for="Password">Password</Label>
                            </Col>
                            <Col md="10" sm="10">
                                <Input className="fields" type="password" name="password" value={password} placeholder="don't tell!" onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <Button className="submit" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <Container>
                    <Row>
                        <Col>
                            <NavLink className="navlink" to='/'>Already have an account</NavLink>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Signup