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
        The Gooners World is an independent, non-commercial project created by supporters, for supporters.
        It is not affiliated with, endorsed by, or associated with Arsenal Football Club, the Premier League,
        or UEFA. All club names, crests and trademarks are the property of their respective owners.
      </p>
    </div>
  );
}
