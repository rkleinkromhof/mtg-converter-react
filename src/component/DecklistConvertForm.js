import React from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import ConverterFactory from "../logic/ConverterFactory";

import DeckManagerSelect from "./DeckManagerSelect";
import './DecklistConvertForm.css';

export default class DecklistConvertForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            deckManagerFrom: 'tappedout',
            deckManagerTo: 'archidekt',
            decklistFrom: '',
            decklistTo: '',
        };

        this.converterFactory = new ConverterFactory();

        this.handleDeckManagerFromChange = this.handleDeckManagerFromChange.bind(this);
        this.handleDeckManagerToChange = this.handleDeckManagerToChange.bind(this);
        this.handleDecklistFromChange = this.handleDecklistFromChange.bind(this);
        this.handleDecklistToChange = this.handleDecklistToChange.bind(this);
        this.handleConvertClick = this.handleConvertClick.bind(this);
        this.handleSwitchClick = this.handleSwitchClick.bind(this);
    }

    handleDeckManagerFromChange(value) {
        this.setState({
            deckManagerFrom: value
        });
    }

    handleDeckManagerToChange(value) {
        this.setState({
            deckManagerTo: value
        });
    }

    handleDecklistFromChange(e) {
        this.setState({
            decklistFrom: e.target.value
        });
    }

    handleDecklistToChange(e) {
        this.setState({
            decklistTo: e.target.value
        });
    }

    handleConvertClick(e) {
        let valueIn = this.state.decklistFrom;

        const converterIn = this.converterFactory.createConverter(this.state.deckManagerFrom);
        const converterOut = this.converterFactory.createConverter(this.state.deckManagerTo);

        let valueOut = converterIn.parse(valueIn, converterOut);

        this.setState({
            decklistTo: valueOut
        })
    }

    handleSwitchClick(e) {
        this.setState((state,  props) => ({
            deckManagerFrom: state.deckManagerTo,
            deckManagerTo: state.deckManagerFrom,
            decklistFrom: state.decklistTo,
            decklistTo: state.decklistFrom,
        }));
    }

    render() {
        return (
            <Container className="decklist-convert-form">
                <Row className="justify-content-center pb-2">
                    <Col>
                        <DeckManagerSelect
                            name="deckManagerFrom"
                            value={this.state.deckManagerFrom}
                            onDeckManagerChange={this.handleDeckManagerFromChange} />
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <DeckManagerSelect
                            name="deckManagerTo"
                            value={this.state.deckManagerTo}
                            onDeckManagerChange={this.handleDeckManagerToChange} />
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col>
                        <textarea
                            className="form-control bg-dark text-light"
                            placeholder="Deck list to convert"
                            aria-label="Deck list to convert"
                            value={this.state.decklistFrom}
                            onChange={this.handleDecklistFromChange}
                        />
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <textarea
                            className="form-control bg-dark text-light"
                            placeholder="Deck list to convert"
                            aria-label="Deck list to convert"
                            value={this.state.decklistTo}
                            onChange={this.handleDecklistToChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-grid gap-2">
                        <Button variant="primary" onClick={this.handleConvertClick}>Convert</Button>
                    </Col>
                    <Col className="d-grid gap-2">
                        <Button variant="secondary" onClick={this.handleSwitchClick}>Switch</Button>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        )
    }
}
