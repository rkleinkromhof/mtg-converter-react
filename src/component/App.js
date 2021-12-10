import React, { PureComponent } from "react";

import Header from "./Header";
import DecklistConvertForm from "./DecklistConvertForm";
import './App.css';


export default class App extends PureComponent {
    render() {
        return (
            <div className="app">
                <Header title="Decklist Converter" />
                <DecklistConvertForm />
                <footer className="footer p-3">
                    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </footer>
            </div>
        );
    }
}
