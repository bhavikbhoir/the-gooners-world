import React, { Component } from 'react'
import {FaInfoCircle, FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import CHEARS from '../assets/CHEARS.jpg';

export default class Fixtures extends Component {
    btnClick() {
        window.open("https://youtu.be/WpKUgEAywAE");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <h3>Fixtures & Results<span role="img" aria-label="fixtures icon"> 🏟️</span></h3>
                <Row id="large-fixtures">
                    <Col lg={6} md={12} sm={12} className="last-match">
                    <iframe title="last-match-large" frameborder="0"  scrolling="no" width="500" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-last-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=500&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>               
                    </Col>
                    <Col lg={6} md={12} sm={12} className="next-match">
                    <iframe title="next-match-large" frameborder="0"  scrolling="no" width="500" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-next-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=500&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col className="details">
                    <Button variant="danger" onClick={this.detailsbtnClick}><FaInfoCircle/> More Details</Button>
                    </Col>
                </Row>
                <Row id="mobile-fixtures">
                    <Col lg={12}>
                    <iframe title="last-match-mobile" frameborder="0"  scrolling="no" width="350" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-last-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=350&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col lg={12}>
                    <iframe title="next-match-mobile" frameborder="0"  scrolling="no" width="350" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-next-match&lang_id=2&country=67&template=12&team=180231&timezone=America/New_York&time=24&width=350&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col className="details">
                    <Button variant="danger" onClick={this.detailsbtnClick}><FaInfoCircle/> More Details</Button>
                    </Col>
                </Row>

                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Derby Delight for the Gunners<span role="img" aria-label="red-white icon"> 🔴⚪️</span></b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>CHELSEA 0 - 1 ARSENAL</b>
                            <br/>
                            <br/>
                            Having scored his first ever League goal last weekend against the Baggies, Emile Smith Rowe scored his second league goal after capitalizing
                             on a Chelsea mistake to score the only goal of the game, and extend our winning run in the league to three games.
                            <br/>
                            <br/>
                            This goal owed a bit more to good fortune though, as he stroked home from Pierre-Emerick Aubameyang's pass, once Chelsea keeper Kepa Arrizabalaga had scrambled back to prevent an own goal.
                            <br/>
                            <br/> 
                            We displayed a strong defense for the rest of the game after scoring the early goal.
                            <br/>
                            <br/>                         
                            After a hard fought game, we managed to secure our first double over the London rivals since 20003/2004, with our first victory at Stamford Bridge since that famous 5-3 in 2011.
                            <br/>
                            <br/>  
                            <i>We play Crystal Palace next in our final away game of the season.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    <img src={CHEARS} alt="ESR and Auba celebrate former's goal against Chelsea."/>
                    <caption>ESR and Auba celebrate former's goal against Chelsea. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
