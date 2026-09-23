import React, { Component } from 'react';
import '../components/styles.css';
import '../components/styles.scss';
import logo from '../assets/logo.png';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                {/* Header renders outside <Router>, so a plain link rather than <Link> */}
                <a href="/" aria-label="The Gooners World home">
                    <img src={logo} alt="The Gooners World"/>
                </a>
            </div>
        )
    }
}
