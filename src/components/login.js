import React, { Component } from 'react';
import firebase from "firebase";
import {Container, Button, Form, FormGroup, Row, Col, Spinner} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import fire from "../config/firebase";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: true,
        }
    }

    // componentDidMount() {
    //     setTimeout(async () => {
    //         this.setState({
    //             loading: false,
    //         });
    //     }, 2000);
    // }

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
        const { email, password, loading } = this.state;
        return (
            <div className="main">
                {!loading ?
                    <div>
                        <Spinner animation="grow" style={{width:"50px", height:"50px"}}/>
                    </div>
                    :
                    <>
                        <Form className="mb-3 container" onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup className="container">
                                <Row>
                                    <Col md="2" sm="2">
                                        <Form.Label>Email</Form.Label>
                                    </Col>
                                    <Col md="10" sm="10">
                                        <Form.Control className="fields" type="email" name="email" value={email}
                                               placeholder="something@idk.cool"
                                               onChange={this.handleChange.bind(this)}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup className="container">
                                <Row>
                                    <Col md="2" sm="2">
                                        <Form.Label>Password</Form.Label>
                                    </Col>
                                    <Col md="10" sm="10">
                                        <Form.Control className="fields" type="password" name="password" value={password}
                                               placeholder="don't tell!" onChange={this.handleChange.bind(this)}/>
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
                                    <NavLink className="navlink" to='/sign-up'>Don't have an account ?</NavLink>
                                </Col>
                            </Row>
                        </Container>
                    </>
                }
            </div>
        );
    }
}

export default Login