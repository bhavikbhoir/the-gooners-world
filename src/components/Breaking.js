import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaHourglass, FaHourglassEnd, FaPen} from 'react-icons/fa'
import { Row, Col, Card, CardColumns } from 'react-bootstrap'
import News2 from './News/News2';

export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3>Breaking 🔥</h3>
                <h5 id="kit" style={{marginBottom:"1rem"}}><b>#WelcomeAlex</b></h5>
                <Row>                  
                    <Col lg={7} md={7} sm={12}>
                    <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=bwLoYSjzG6c"
                    />
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>Alex Runarsson signs for Arsenal</b>
                            <br/>
                            <br/>
                            Goalkeeper Alex Runarsson has joined us on a four-year contract from French club Dijon.
                            <br/>
                            <br/>
                            The 25-year-old Iceland international joined the Ligue 1 club in July 2018 and made 13 appearances for them in all competitions last season.
                            <br/>
                            <br/>
                            Alex on why he signed for Arsenal - "It's one of the biggest clubs in the world... it's a win-win situation."
                            <br/>
                            <br/>
                            Alex will wear the number 13 shirt at Arsenal.
                            {/* <br/>
                            <br/>
                            The new shirt colours are intended to represent the lights and atmosphere that illuminate Emirates Stadium during a night match. The shirt pattern was created from a custom set of tie dye prints. */}
                        </p>
                    </Col>  
                </Row>                    
            </div>
        )
    }
}
