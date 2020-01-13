import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import firebase from "firebase";
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
        const promise = fire.auth().createUserWithEmailAndPassword(email, password);
        promise.then( async (res) => {
                    await res.user.updateProfile({
                        displayName: name
                    })
                        .then(() => {
                            const userUid = fire.auth().currentUser.uid;
                            const userRef = db.collection("Users").doc(userUid);
                            userRef.set({
                                name: name,
                                email: email,
                                phone: phone,
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),

                            });
                            this.props.history.push('/profile');
                        })
            })
            .catch(err => {
                console.log(err, 'err-=-=-=-')
            });
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
        const { name, email, phone, password, loading } = this.state
        return (
            <div className="main">
                <Form className="mb-3 container" onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup className="container">
                        <Row>
                            <Col md="2" sm="2">
                                <Form.Label>Name</Form.Label>
                            </Col>
                            <Col md="10" sm="10">
                                <Form.Control className="fields" type="text" name="name" value={name} placeholder="something" onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup className="container">
                        <Row>
                            <Col md="2" sm="2">
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col md="10" sm="10">
                                <Form.Control className="fields" type="email" name="email" value={email} placeholder="something@example.com" onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup className="container">
                        <Row>
                            <Col md="2" sm="2">
                                <Form.Label>Phone</Form.Label>
                            </Col>
                            <Col md="10" sm="10">
                                <Form.Control className="fields" type="phone" name="phone" value={phone} placeholder="+92-6546545" onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup className="container">
                        <Row>
                            <Col md="2" sm="2">
                                <Form.Label>Password</Form.Label>
                            </Col>
                            <Col md="10" sm="10">
                                <Form.Control className="fields" type="password" name="password" value={password} placeholder="don't tell!" onChange={this.handleChange.bind(this)}/>
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
                            <NavLink className="navlink" to='/login'>Already have an account</NavLink>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Signup