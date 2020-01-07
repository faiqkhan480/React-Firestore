import React from 'react';
import firebase from "firebase";
import fire, { db } from "../config/firebase";
import {
    Container,
    Row,
    Col,
    Button,
    Progress,
    Form,
    FormGroup,
    Input,
    Card,
    CardColumns,
    CardBody,
    CardTitle, CardSubtitle, CardText, Jumbotron, Spinner
} from 'reactstrap'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uid: '',
            data: null,
            post: '',
        }
    }

    componentDidMount() {
        const userUid = fire.auth().currentUser.uid;
        const arr  = [];
        this.setState({uid: userUid});
        console.log(userUid, 'is sign in.....')
        const userRef = db.collection("Data").doc(userUid);
        userRef.collection("posts")
            .onSnapshot((querySnap) => {
                querySnap.forEach((doc) => {
                    arr.push(doc.data())
                })
                this.setState({data: arr});
            });
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
        const { uid, post } = this.state;
        const path = db.collection("Data").doc(uid)
        path.collection("posts").add({
            name: 'admin',
            post: post,
            date: new Date(),
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
        return(
            <div className="wrapper">
                { data ?
                    <Container>
                        <Row>
                            <Col><h1 className="display-3 name">Profile...</h1></Col>
                            <Col lg="12">
                                <Button color="danger" onClick={this.handleLogout.bind(this)}> logOut </Button>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <div>
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
                    </div>
                }
            </div>
        )
    }
}

export default Profile