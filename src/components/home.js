import React, { Component } from 'react';
import {Card, Container, Spinner} from "react-bootstrap";


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            splashing: 'https://source.unsplash.com/1600x900/',
            loading: true,
        }
    }

    componentDidMount() {
        fetch(this.state.unsplashimg).then((response)=> {
            this.setState({
                loading: false,
            })
        })
    }

    render() {
        const { splashing, loading } = this.state
        console.log(splashing, "in render")
        return(
            <div className="root">
                <Container>
                    { !loading ?
                            <Card text="white" className="text-center p-3 banner" border="light">
                                <Card.Img variant="top" className="post" src={`${splashing}?todo`} />
                                <blockquote className="blockquote mb-0 card-body">
                                    <footer className="blockquote-footer">
                                        <small className="text-muted">
                                            Make your<cite title="Source Title"> Todos</cite>
                                        </small>
                                    </footer>
                                </blockquote>
                            </Card>
                        :
                        <div className="post-loading">
                            <Spinner animation="grow" />
                        </div>
                    }
                </Container>

            </div>
        )
    }
}

export default Home