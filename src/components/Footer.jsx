import React, { Component } from 'react'
import { FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa'
import {IoIosFootball } from 'react-icons/io';
export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div>
                    <p>CREATED WITH PASSION! <span style={{color: "red"}}>#COYG</span><IoIosFootball /></p> 
                </div>
                <div className="contact">
                    <FaEnvelope style={{color: "#0F9D58"}}/> <a href="mailto:	thegoonersworld@gmail.com">thegoonersworld@gmail.com</a>
                    <br/>
                    <FaTwitter style={{color: "rgb(29, 161, 242)"}} /> <a href="https://twitter.com/TheGoonersWorld">@TheGoonersWorld</a>
                    <br/>
                    <FaInstagram style={{color: "#C13584"}} /> <a href="https://www.instagram.com/thegoonersworld/">@thegoonersworld</a>
                </div>
            </div>
        )
    }
}
