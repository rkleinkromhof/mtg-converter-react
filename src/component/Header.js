import React, { PureComponent } from "react";
import "./Header.css";

export default class Header extends PureComponent {
    render() {
        return (
            <header className="component-header">
                <img
                    src="logo.png"
                    width="32"
                    height="32"
                    alt="logo"
                />
                <div className="component-header-title">{this.props.title}</div>
            </header>
        );
    }
}
