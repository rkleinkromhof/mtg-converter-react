import React, { PureComponent } from "react";

import { Container, Row, Col } from "react-bootstrap";

import Header from "./Header";
import './App.css';


export default class App extends PureComponent {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        <Header
                            title="Decklist Converter"
                         />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        TODO: add stuff
                    </Col>
                </Row>
            </Container>
        )
    }
}
