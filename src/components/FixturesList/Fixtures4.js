import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaInfo, FaInfoCircle, FaPlay} from 'react-icons/fa'
import { Row, Col, Card, CardColumns, Button } from 'react-bootstrap'
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
                <h3>Fixtures & Results 🏟️</h3>
                <Row id="large-fixtures">
                    <Col lg={6} md={12} sm={12}>
                    <iframe frameborder="0"  scrolling="no" width="500" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-last-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=500&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>               
                    </Col>
                    <Col lg={6} md={12} sm={12} style={{textAlign: "right"}}>
                    <iframe frameborder="0"  scrolling="no" width="500" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-next-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=500&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col className="details">
                    <Button variant="danger" onClick={this.detailsbtnClick}><FaInfoCircle/> More Details</Button>
                    </Col>
                </Row>
                <Row id="mobile-fixtures">
                    <Col lg={12}>
                    <iframe frameborder="0"  scrolling="no" width="350" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-last-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=350&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col lg={12}>
                    <iframe frameborder="0"  scrolling="no" width="350" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-next-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=350&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col className="details">
                    <Button variant="danger" onClick={this.detailsbtnClick}><FaInfoCircle/> More Details</Button>
                    </Col>
                </Row>

                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>6 Goal Thriller in East London 🔴⚪️</b></h5>
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