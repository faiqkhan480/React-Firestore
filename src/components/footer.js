import React, { Component } from 'react'
import {Col, Container, Row} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

class Footer extends Component{
    render() {
        return(
            <Container>
                <Row className="footer">
                    <Col>
                        <a className="repolink" href="https://github.com/faiqkhan480/react-firestore">
                            faiqkhan480.
                            <FontAwesomeIcon size="2x" icon={faGithub} />
                        </a>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Footer