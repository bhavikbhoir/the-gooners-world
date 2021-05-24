import React, { Component } from 'react'
import {FaInfoCircle, FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import ARSBRI from '../assets/ARSBRI.jpg';

export default class Fixtures extends Component {
    btnClick() {
        window.open("https://youtu.be/ADZu0sHlIiM");
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
                    <iframe title="last-match-large" frameborder="0"  scrolling="no" width="500" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-last-match&lang_id=2&country=67&template=12&team=180231&timezone=Europe/London&time=12&width=500&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>               
                    </Col>
                    <Col lg={6} md={12} sm={12} className="next-match">
                    <iframe title="next-match-large" frameborder="0"  scrolling="no" width="500" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-next-match&lang_id=2&country=67&template=12&team=180231&timezone=Europe/London&time=12&width=500&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col className="details">
                    <Button variant="danger" onClick={this.detailsbtnClick}><FaInfoCircle/> More Details</Button>
                    </Col>
                </Row>
                <Row id="mobile-fixtures">
                    <Col lg={12}>
                    <iframe title="last-match-mobile" frameborder="0"  scrolling="no" width="350" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-last-match&lang_id=2&country=67&template=12&team=180231&timezone=Europe/London&time=12&width=350&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col lg={12}>
                    <iframe title="next-match-mobile" frameborder="0"  scrolling="no" width="350" height="200" src="https://www.fctables.com/teams/arsenal-180231/iframe/?type=team-next-match&lang_id=2&country=67&template=12&team=180231&timezone=Europe/London&time=12&width=350&height=200&font=Helvetica&fs=14&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=30&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=FFFFFF&hfc=000000"></iframe>
                    </Col>
                    <Col className="details">
                    <Button variant="danger" onClick={this.detailsbtnClick}><FaInfoCircle/> More Details</Button>
                    </Col>
                </Row>

                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Final day drama!<span role="img" aria-label="red-white icon"> 🔴⚪️</span></b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>ARSENAL 2-0 BRIGHTON</b>
                            <br/>
                            <br/>
                            A fifth straight win to close out the Premier League season was not enough to secure European football next term.
                            <br/>
                            <br/>
                            A second successive brace from Nicolas gave us all three points on the final day of the season, but results elsewhere didn't go our way, meaning we finished eighth for the second year in a row.
                            <br/>
                            <br/> 
                            With Tottenham and Everton both trailing in their games, we were on course for seventh place, and European football again.
                            <br/>
                            <br/>                         
                            However, late Tottenham goals dampened the stadium atmosphere and our final day win wasn't enough to secure a spot in the European Conference league.
                            <br/>
                            <br/>  
                            We finish eighth in the Premier League, the same placing as last season (but with five more points), and it means we will not be competing in European football next term, for the first time since 1995/96.
                            <br/>
                            <br/>  
                            The fixtures for 2021/22 season will be released on June 16 at 9am (UK time). 
                            <br/>
                            <br/>
                            A couple of pre-season friendlies have already been announced, away to Hibernian on Tuesday, July 13 and then away to Scottish champions Rangers on Monday July 12.
                            <br/>
                            <br/>
                            The Premier League season kicks off on Saturday, August 14.
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    <img src={ARSBRI} alt="Pepe grabs his second goal of the day."/>
                    <caption>Pepe grabs his second goal of the day. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
