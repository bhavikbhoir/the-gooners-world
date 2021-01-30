import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaHourglass, FaHourglassEnd, FaPen} from 'react-icons/fa'
import { Row, Col, Card, CardColumns } from 'react-bootstrap'
import News2 from './News/News2';

export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3>Breaking 🔥</h3>
                <h5 id="kit" style={{marginBottom:"1rem"}}><b>#WelcomeAlex</b></h5>
                <Row>                  
                    <Col lg={7} md={7} sm={12}>
                    <ReactPlayer
                        style={{width: "auto"}}
                        url="https://youtu.be/IDpHZ-8_FJY"
                    />
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>Mat Ryan signs for Arsenal</b>
                            <br/>
                            <br/>
                            The 28-year-old Goalkeeper has joined us on a loan deal until the end of the season.
                            <br/>
                            <br/>
                            Mikel Arteta said: “We know Mat very well through his performances with Brighton in recent seasons and he brings additional quality to our squad. 
                            We welcome Mat to Arsenal and look forward to working with him this season.”  
                            <br/>
                            <br/>
                            Alex will wear the number 33 shirt at Arsenal.
                            {/* <br/>
                            <br/>
                            The new shirt colours are intended to represent the lights and atmosphere that illuminate Emirates Stadium during a night match. The shirt pattern was created from a custom set of tie dye prints. */}
                        </p>
                    </Col>  
                </Row>                    
            </div>
        )
    }
}
