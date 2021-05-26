import React, { Component } from 'react'
import {FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import WHUARS from '../assets/WHUARS.jpg';

export default class Fixtures extends Component {
    btnClick() {
        window.open("https://youtu.be/1ue5FO-2NBg");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>6 Goal Thriller in East London<span role="img" aria-label="red-white icon"> 🔴⚪️</span></b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>WEST HAM 3 - 3 ARSENAL</b>
                            <br/>
                            <br/>
                            We mounted a superb comeback from three goals down to claim a point in a thrilling encounter with West Ham United on Sunday afternoon.
                            <br/>
                            <br/>
                            The hosts took complete control of the game in the opening half-hour, scoring through Jesse Lingard, Jarrod Bowen and Tomas Soucek.
                            <br/>
                            <br/> 
                            But a Soucek own goal before the interval gave us hope, and then another own goal, this time by Craig Dawson, and an Alex Lacazette header sealed an unlikely point.
                            <br/>
                            <br/>                         
                            The comeback was complete – but we couldn't claim all three points on the day.
                            {/* <br/>
                            <br/>   
                            But the rest of the game was essentially about our efforts to find an equaliser and ended in a defeat. */}
                            <br/>
                            <br/>
                            <i>We host Liverpool in our next Premier League clash.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={WHUARS} alt="Gunners celebrating Lacazette's goal against West Ham."/>
                    <caption>Gunners celebrating Lacazette's goal against West Ham. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}