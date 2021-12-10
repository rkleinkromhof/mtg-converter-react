import React from "react";

export default class DeckManagerSelect extends React.PureComponent {
    #deckManagers = {
        tappedout: 'TappedOut',
        archidekt: 'Archidekt',
        moxfield: 'Moxfield',
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || this.#deckManagers.tappedOut
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onDeckManagerChange(e.target.value);
    }

    render() {
        return (
            <select className="form-select bg-dark text-light"
                    aria-label="Select a list type"
                    value={this.props.value}
                    onChange={this.handleChange}
            >
                <option disabled>Select a list type to convert from</option>
                <option value="tappedout">TappedOut</option>
                <option value="archidekt">Archidekt</option>
                <option value="moxfield">Moxfield</option>
            </select>
        );
    }
}
