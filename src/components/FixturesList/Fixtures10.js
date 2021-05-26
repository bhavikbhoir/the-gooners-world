import React, { Component } from 'react'
import {FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import NEWARS from '../../assets/NEWARS.jpg';

export default class Fixtures10 extends Component {
    btnClick() {
        window.open("https://youtu.be/HJynUQ2yqBI");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Comfortable win at St James' Park<span role="img" aria-label="red-white icon"> 🔴⚪️</span></b></h5>
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
