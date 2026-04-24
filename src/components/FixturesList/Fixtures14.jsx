import React, { Component } from 'react'
import {FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import CRYARS from '../../assets/CRYARS.jpg';

export default class Fixtures14 extends Component {
    btnClick() {
        window.open("https://youtu.be/gsEH9EkWDg4");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Late Drama at Selhurst Park<span role="img" aria-label="red-white icon"> 🔴⚪️</span></b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>CRYSTAL PALACE 1 - 3 ARSENAL</b>
                            <br/>
                            <br/>
                            Late goals from Gabriel Martinelli and Nicolas Pepe meant we took all three points home and kept the fight for Europa League spot alive.
                            <br/>
                            <br/>
                            The final away game of the season saw the men's team don the newly released away kit.
                            <br/>
                            <br/> 
                            Pepe had given us the lead in the first half with a lovely finish at the end of a slick team move, before Christian Benteke equalised.
                            <br/>
                            <br/>                         
                            Just as it appeared we would be held to a frustrating draw, Martinelli popped up in the 91st minute to put us back in front, and Pepe sealed the win late on with a fine individual effort.
                            <br/>
                            <br/>  
                            <i>We host Brighton next in our final game of the season with 10,000 fans back to Emirates Stadium.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    <img src={CRYARS} alt="Gabriel Martinelli scores a late goal against Palace."/>
                    <caption>Gabriel Martinelli scores a late goal against Palace. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
