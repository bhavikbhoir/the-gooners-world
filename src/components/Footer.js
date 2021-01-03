import React, { Component } from 'react'
import { FaTwitter, FaInstagram, FaFootballBall } from 'react-icons/fa'
import {IoIosFootball } from 'react-icons/io';
import InstagramButton from  "react-instagram-button";

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                {/* <p>Follow Us!</p> */}
                {/* <ul>
                    <li>
                    <a href="https://twitter.com/TheGoonersWorld?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @TheGoonersWorld</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                    </li>
                    <li>
                    <InstagramButton username={"thegoonersworld"} />
                    </li>
                </ul> */}
                <p>Created with passion <span style={{color: "red"}}>#COYG</span></p><IoIosFootball /> 
            </div>
        )
    }
}
