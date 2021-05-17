import React, { Component } from 'react';
import '../components/styles.css';
import logo from '../assets/logo.png';
import { Row, Col } from 'react-bootstrap';
import FCT from '../assets/FCTables.jpg';
import FWP from '../assets/FWP.jpg';
import cover from '../assets/about_cover.jpg';
import { FaEnvelope, FaInstagram, FaTwitter } from 'react-icons/fa';

export default class About extends Component {
    render() {
        return (
            <div className="about">
                {/* <h3>ABOUT US</h3> */}
                <Row style={{textAlign: "center"}}>
                    <Col xs={12} className="about_message">
                        <p>
                            <h3>Your home for all things Arsenal F.C.</h3> 
                            Started in September 2020 with passion to bring all the Arsenal Fans around the world, 
                            the latest team news, transfer updates, match results and reports along with weekly 
                            stats, trending updates, and matchday polls.
                        </p>
                        <br/>
                    </Col>
                    <Col md={6} sm={12}>
                        <h4>Our Partners</h4>
                        <Row>
                        <br/>
                            <Col>
                            <a href="https://www.fctables.com/"><img src={FCT} alt="FC Tables" className="fct"></img></a>
                            <br/>
                            FC Tables
                            </Col>
                            {/* <Col>
                            <a href="https://www.footballwebpages.co.uk/"><img src={FWP} alt="Football Web Pages" className="fwp"></img></a>
                            <br/>
                            Football Web Pages
                            </Col> */}
                        </Row>
                    </Col>
                    <Col md={6} sm={12}>
                        <h4>Contact Us</h4>
                        <div className="contact">
                            <FaEnvelope style={{color: "#0F9D58"}}/> <a href="mailto:	thegoonersworld@gmail.com">thegoonersworld@gmail.com</a>
                            <br/>
                            <FaTwitter style={{color: "rgb(29, 161, 242)"}} /> <a href="https://twitter.com/TheGoonersWorld">@TheGoonersWorld</a>
                            <br/>
                            <FaInstagram style={{color: "#C13584"}} /> <a href="https://www.instagram.com/thegoonersworld/">@thegoonersworld</a>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
