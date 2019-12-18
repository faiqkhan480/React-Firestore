import React from 'react';
import firebase from "firebase";
import { Container, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: ''
        }
    }

    logout() {
        firebase.auth().signOut();
    }

    render() {
        return(
            <Container className="container">
                <Card>
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button onClick={this.logout.bind(this)}>Logout</Button>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default Profile