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
            <Jumbotron fluid className="jumbotron">
                { !data ?
                    <div className="loading">
                        <Progress animated color="primary" value="100" />
                    </div>
                    // <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
                    :
                <Container fluid>
                    <Row>
                        <Col className="logout">
                            <Button color="danger" onClick={this.handleDelete.bind(this)}> Delete </Button>
                        </Col>
                        <Col className="logout">
                            <Button color="danger" onClick={this.handleLogout.bind(this)}> logOut </Button>
                        </Col>
                    </Row>
                    <Row>
                      <CardColumns className="data">
                          {
                              data.map(( doc, i )=> {
                                  return (
                                      <Card key={i}>
                                          <CardBody>
                                              <CardTitle>{doc.name}</CardTitle>
                                              <CardText>{doc.post}</CardText>
                                              <Button>Delete</Button>
                                          </CardBody>
                                      </Card>
                                  )
                              })
                          }
                      </CardColumns>
                    </Row>
                    <Form className="bottom-form" onSubmit={this.handleSubmit.bind(this)}>
                        <Row form>
                            <Col md={10}>
                                <FormGroup>
                                    <Input type="text"placeholder="Posts" name="post" value={post} onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <Button color="primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>}
            </Jumbotron>
        )
    }
}

export default Profile