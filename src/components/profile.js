import React from 'react';
import firebase from "firebase";
import fire, { db } from "../config/firebase";
import {Container, Row, Col, Button, Spinner, Navbar, Form, FormControl, ListGroup} from 'react-bootstrap'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uid: '',
            user: '',
            data: null,
            post: '',
        }
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                const arr  = [];
                this.setState({uid: user.uid, user: user.displayName});
                console.log(user.displayName, 'is sign in.....')
                const userRef = db.collection("Users").doc(user.uid);
                userRef.collection("posts")
                    .onSnapshot((querySnap) => {
                        querySnap.forEach((doc) => {
                            arr.push(doc.data())
                        })
                        this.setState({data: arr});
                    });
            }
        })
        // const user = fire.auth().currentUser;

    }

    handleLogout() {
        fire.auth().signOut();
    }

    handleDelete() {
        var user = firebase.auth().currentUser;

        user.delete().then(function() {
            console.log('User deleted');
            this.props.history.push('/sign-up')
        }).catch(function(error) {
            console.log(error, 'An error happened.');
        });
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        const { uid, user, post } = this.state;
        const path = db.collection("Users").doc(uid)
        path.collection("posts").add({
            name: user,
            post: post,
            date: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then((res)=> {
                this.setState({post: ''});
                console.log('Document successfully written!');
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
    }

    render() {
        const { post, data } = this.state;
        console.log(data)
        return(
            <div className="mb-3">
                {data ?
                    <Container>
                        <Row >
                            <Col className="wrapper" lg="12">
                                <ListGroup variant="flush">
                                    {data.map((doc, index) => (
                                        <ListGroup.Item key={index}>{doc.post}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col>
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <Container>
                                        <Row className="mt-3">
                                            <Col md="10" sm="12" xs="12" className="pt-1 pb-1">
                                                <Form.Control
                                                    type="text"
                                                    name="post"
                                                    value= {post}
                                                    placeholder="Type Something in your mind..."
                                                    className="post-field"
                                                    onChange={this.handleChange.bind(this)}/>
                                            </Col>
                                            <Col md="2" sm="12" xs="12" className="text-center pt-1 pb-1">
                                                <Button type="submit" className="post">Post</Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <div className="main">
                        <Spinner animation="grow" style={{width:"50px", height:"50px"}}/>
                    </div>
                }
            </div>
        )
    }
}

export default Profile