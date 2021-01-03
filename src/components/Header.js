import React, { Component } from 'react';
import '../components/styles.css';
import logo from '../assets/logo.png';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <img src={logo} />
            </div>
        )
    }
}
