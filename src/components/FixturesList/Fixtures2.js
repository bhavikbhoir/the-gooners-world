import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaInfo, FaInfoCircle, FaPlay} from 'react-icons/fa'
import { Row, Col, Card, CardColumns, Button } from 'react-bootstrap'
import LEIvsARS from '../assets/LEIvsARS.jpg';

export default class FixturesArchive2 extends Component {
    btnClick() {
        window.open("https://youtu.be/EGbyyaGE4GA");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Commanding performance at The King Power 🔴⚪️</b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>LEICESTER 1 - 3 ARSENAL</b>
                            <br/>
                            <br/>
                            We delivered a commanding performance to come from a goal down to win on the road at Leicester City on Sunday.
                            <br/>
                            <br/>
                            After conceding early on when Youri Tielemans raced through to score, we kept our composure and worked our way back into the game when David Luiz headed home a well-worked free kick.
                            <br/>
                            <br/> 
                            Alex Lacazette put us in the lead from the spot after we were awarded a penalty for handball on the stroke of half time, before the lively Nicolas Pepe wrapped up the scoring after the interval at the end of a flowing counter attack.
                            {/* <br/>
                            <br/>                         
                            City were still seeing more of the ball but we reached the final 20 minutes still very much in the game - and almost levelled in bizarre circumstances. */}
                            {/* <br/>
                            <br/>   
                            But the rest of the game was essentially about our efforts to find an equaliser and ended in a defeat. */}
                            <br/>
                            <br/>
                            <i>We host Burnley in our next Premier League clash.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={LEIvsARS} alt="Man of the Match Willian in action against Leicester."/>
                    <caption>Man of the Match Willian in action against Leicester. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
