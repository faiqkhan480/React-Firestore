import React from 'react';
import firebase from "firebase";
import fire, { db } from "../config/firebase";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Input,
    Card,
    CardColumns,
    CardBody,
    CardTitle, CardSubtitle, CardText, Jumbotron
} from 'reactstrap'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uid: '',
            post: '',
        }
    }

    componentDidMount() {
        const user = fire.auth().currentUser;
        // this.setState({uid: user.uid})
        console.log(user, 'is sign in.....')
    }

    handleLogout() {
        fire.auth().signOut();
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        const { uid, post } = this.state;
        const path = db.collection(uid).doc('Data')
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
        const { post } = this.state;
        return(
            <Jumbotron fluid className="jumbotron">

                <Container fluid>
                    <Row>
                        <Col className="logout">
                            <Button color="danger" onClick={this.handleLogout.bind(this)}> logOut </Button>
                        </Col>
                    </Row>
                    <Row>
                        <CardColumns>
                            <Card>
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                    <Button>Delete</Button>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Delete</Button>
                                </CardBody>
                            </Card>
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button>Delete</Button>
                            </Card>
                            <Card>
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                                    <Button>Delete</Button>
                                </CardBody>
                            </Card>
                            <Card body inverse color="primary">
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button color="secondary">Delete</Button>
                            </Card>
                        </CardColumns>
                    </Row>
                    <Form className="bottom-form" onSubmit={this.handleSubmit.bind(this)}>
                        <Row form>
                            <Col md={11}>
                                <FormGroup>
                                    <Input type="text"placeholder="Posts" name="post" value={post} onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <Button color="primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Jumbotron>
        )
    }
}

export default Profile