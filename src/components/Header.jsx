import React, { Component } from 'react';
import '../components/styles.css';
import '../components/styles.scss';
import logo from '../assets/logo.png';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <img src={logo} alt="The Gooners World"/>
            </div>
        )
    }
}
