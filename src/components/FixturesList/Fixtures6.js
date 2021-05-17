import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaInfo, FaInfoCircle, FaPlay} from 'react-icons/fa'
import { Row, Col, Card, CardColumns, Button } from 'react-bootstrap'
import SFUvARS from '../../assets/SFUvARS.jpg';

export default class FixturesArchive6 extends Component {
    btnClick() {
        window.open("https://youtu.be/nJ6utMaEeJA");
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
                        <h5 style={{marginBottom:"1rem"}}><b>Convincing victory at Bramall Lane 🔴⚪️</b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>SHEFFIELD UNITED 0 - 3 ARSENAL</b>
                            <br/>
                            <br/>
                            Alexandre Lacazette claimed his 50th Premier League goal as we returned to winning ways in convincing fashion at Bramall Lane.
                            <br/>
                            <br/>
                            The Frenchman opened the scoring with his 49th in the competition - applying the finishing touch to a wonderful team move - before sealing the win late on with goal number 50, tucking home Thomas Partey's excellent throughball.
                            <br/>
                            <br/> 
                            In between those two goals, Gabriel Martinelli scored his first for 15 months, after good work from Nicolas Pepe.
                            <br/>
                            <br/>                         
                            There was a welcome clean sheet as well, as we prepared for Thursday's must-win encounter in Prague in the perfect manner.
                            {/* <br/>
                            <br/>   
                            But the rest of the game was essentially about our efforts to find an equaliser and ended in a defeat. */}
                            <br/>
                            <br/>
                            <i>We host Slavia Prague in the second leg of our Europa League Quater Finals clash.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={SFUvARS} alt="Lacazette celebrating his 50th Arsenal goal in the win against Sheffield United."/>
                    <caption>Lacazette celebrating his 50th Arsenal goal in the win against Sheffield United. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
