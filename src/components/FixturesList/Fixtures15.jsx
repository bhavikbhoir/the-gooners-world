import React, { Component } from 'react'
import {FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import ARSBRI from '../../assets/ARSBRI.jpg';

export default class Fixtures15 extends Component {
    btnClick() {
        window.open("https://youtu.be/ADZu0sHlIiM");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
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
