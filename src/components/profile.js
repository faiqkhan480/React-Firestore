import React from 'react';
import firebase from "firebase";
import fire, { db } from "../config/firebase";
import {Container, Row, Col, Button, Spinner, Form, ListGroup} from 'react-bootstrap';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uid: '',
            user: '',
            data: null,
            post: '',
            curIndex: null
        }
    }

    getData() {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                const data = [];
                this.setState({uid: user.uid, user: user.displayName});
                const userRef = db.collection("Users").doc(user.uid);
                userRef.collection("posts")
                    .onSnapshot((snapshot) => {
                        snapshot.docChanges().forEach((change) => {
                            const obj = {
                                id: change.doc.id,
                                name: change.doc.data().name,
                                comment: change.doc.data().post,
                            }
                            if (change.type === "added") {
                                data.push(obj);
                                this.setState({post: '', data});
                            }
                        });
                    });
            }
        })
    }

    componentDidMount() {
        this.getData()
    }

    handleLogout() {
        fire.auth().signOut();
    }

    // handleUserDelete() {
    //     var user = firebase.auth().currentUser;
    //     console.log(user, "=-=-=-=-cureentuser=")
    //     user.delete().then(function() {
    //         console.log('User deleted');
    //         this.props.history.push('/sign-up')
    //     }).catch(function(error) {
    //         console.log(error, 'An error happened.');
    //     });
    // }

    handleDelete(id, index){
        const { data } = this.state;
        this.setState({currIndex: index});
        const uid = fire.auth().currentUser.uid;
        const userRef = db.collection("Users").doc(uid);
        userRef.collection("posts").doc(id).delete()
            .then(() => {
                const result = data.filter(i => i.id !== id);
                this.setState({data: result, currIndex: null})
            }).catch((error) => {
            console.error("Error removing document: ", error);
            });
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        const { uid, user, post } = this.state;
        const path = db.collection("Users").doc(uid);
        const docc = path.collection("posts").doc().id;
        path.collection("posts").add({
            name: user,
            post: post,
            date: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then((res)=> {
                // this.setState({post: ''});
                console.log('Document successfully written!');
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
    }

    render() {
        const { post, data, currIndex } = this.state;
        return(
            <div className="mb-3">
                {data ?
                    <Container>
                        <Row >
                            <Col className="wrapper" lg="12">
                                <ListGroup variant="flush">
                                    {data.map((doc, index) => {
                                        return (
                                        <ListGroup.Item key={index} className="d-flex justify-content-between">
                                            {doc.comment}
                                            {currIndex == index ?
                                                <div className="spinner-grow" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                <button onClick={this.handleDelete.bind(this, doc.id, index)} type="button" className="close" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            }
                                        </ListGroup.Item>
                                    )})}
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