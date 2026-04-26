import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import {IoIosFootball } from 'react-icons/io';
import XIcon from './XIcon';

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <p>CREATED WITH PASSION! <span style={{color: "red"}}>#COYG</span><IoIosFootball /></p>
      </div>
      <div className="contact">
        <FaEnvelope style={{color: "#0F9D58"}}/> <a href="mailto:thegoonersworld@gmail.com">thegoonersworld@gmail.com</a>
        <br/>
        <XIcon size={20} /> <a href="https://x.com/TheGoonersWorld">@TheGoonersWorld</a>
        <br/>
        <FaInstagram style={{color: "#C13584"}} /> <a href="https://www.instagram.com/thegoonersworld/">@thegoonersworld</a>
      </div>
      <p className="footer__disclaimer">
        This is an independent fan site and is not affiliated with or endorsed by Arsenal Football Club.
        All club logos and trademarks are property of their respective owners.
      </p>
    </div>
  );
}
