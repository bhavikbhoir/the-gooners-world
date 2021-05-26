import React, { Component } from 'react'
import {FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import CHEARS from '../../assets/CHEARS.jpg';

export default class Fixtures13 extends Component {
    btnClick() {
        window.open("https://youtu.be/WpKUgEAywAE");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
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
                            {/* We sit 9th in the table with 52 points and 6 points away from 5th place West Ham. The gunners will hope that other results to go their way in order to have a chance at 
                            qualifying for Europe next season.
                            <br/>
                            <br/> */}
                            <i>We play Crystal Palace next in our final away game of the season.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
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
