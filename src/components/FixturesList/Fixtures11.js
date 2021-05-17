import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaInfo, FaInfoCircle, FaPlay} from 'react-icons/fa'
import { Row, Col, Card, CardColumns, Button } from 'react-bootstrap'
import ARSVIL from '../../assets/ARSVIL.jpg';

export default class Fixtures11 extends Component {
    btnClick() {
        window.open("https://youtu.be/GYi7CHfbPD0");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Heartbreak in Europe 💔</b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>ARSENAL 0 - 0 VILLAREAL (AGG. 1-2)</b>
                            <br/>
                            <br/>
                            A heartbreaking week for the Gunners as we drew against the yellow submarine in probably one of the biggest games of our season.
                            <br/>
                            <br/>
                            Carrying an away goal into the game, we had the home advanatage to turn the tie in our favour but we were unable to make a breakthrough.
                            <br/>
                            <br/> 
                            Chances went begging as Aubameyang hit the post and gunners were unable to put the ball in the net on several occasions. The Gunners managed only one shot at target 
                            which left the players and fans frustrated.
                            <br/>
                            <br/>                         
                            This meant that the Gunners lost their chance to make it to the Champions League next season and given the current league table, Arsenal will be not 
                            be contending in an European competition next season - first time since 95-96 season.
                            {/* <br/>
                            <br/>   
                            But the rest of the game was essentially about our efforts to find an equaliser and ended in a defeat. */}
                            <br/>
                            <br/>
                            <i>We host West Brom next in our Premier League clash.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={ARSVIL} alt="Captain Auba in action against Villareal."/>
                    <caption>Captain Auba in action against Villareal. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
