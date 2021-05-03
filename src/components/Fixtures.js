import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaInfo, FaInfoCircle, FaPlay} from 'react-icons/fa'
import { Row, Col, Card, CardColumns, Button } from 'react-bootstrap'
import NEWARS from '../assets/NEWARS.jpg';

export default class Fixtures extends Component {
    btnClick() {
        window.open("https://youtu.be/HJynUQ2yqBI");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <h3>Fixtures & Results 🏟️</h3>
                <Row id="large-fixtures">
                    <Col lg={6} md={12} sm={12} className="last-match">
                    <iframe frameborder="0"  scrolling="no" width="500" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-last-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=500&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>               
                    </Col>
                    <Col lg={6} md={12} sm={12} className="next-match">
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
                        <h5 style={{marginBottom:"1rem"}}><b>Comfortable win at St James' Park 🔴⚪️</b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>NEWCASTLE 0 - 2 ARSENAL</b>
                            <br/>
                            <br/>
                            Goals in each half helped us get back to winning ways in a dominant performance at St James' Park.
                            <br/>
                            <br/>
                            The first goal was scored by Elneny on five minutes which was our fastest in the Premier League so far this season.
                            We've seen the Egyptian score some great goals in European football, but this was his first in the league - on his 66th appearance in the competition.
                            <br/>
                            <br/> 
                            Our second goal came courtesy of Captain Auba who finished off a great cross from Gabriel Martinelli.
                            <br/>
                            <br/>                         
                            The hosts were down to 10 men in the final minutes of the game after Defender Fabian Schar received a straight red for his challenge on Gabi.
                            {/* <br/>
                            <br/>   
                            But the rest of the game was essentially about our efforts to find an equaliser and ended in a defeat. */}
                            <br/>
                            <br/>
                            <i>We play Villarreal next in the second leg of our Europa League clash.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={NEWARS} alt="Gabriel Martinelli in action against Newcastle."/>
                    <caption>Gabriel Martinelli in action against Newcastle. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
