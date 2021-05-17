import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHandPointRight, FaHeart, FaHourglass, FaHourglassEnd, FaPen} from 'react-icons/fa'
import { Row, Col, Card, CardColumns } from 'react-bootstrap'
import News2 from './News/News2';

export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3>Breaking 🔥</h3>
                <h5 id="kit" style={{marginBottom:"1rem"}}><b>#WelcomeØdegaard</b></h5>
                <Row>                  
                    <Col lg={7} md={7} sm={12}>
                    <ReactPlayer
                        style={{width: "auto"}}
                        url="https://youtu.be/Gog2TKtBmQE"
                    />
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>Ødegaard is a Gunner!</b>
                            
                            <br/>
                            Norwegian international Martin Odegaard is joining us from Real Madrid on loan for the remainder of the season.
                            <br/>
                            <br/>
                            Mikel Arteta said: “It’s great that we’ve secured Martin to come to us until the end of the season. Martin is of course a player that we all know very well and although still young, he has been playing at the top level for a while. Martin will provide us with quality offensive options and we’re all excited to be integrating him into our plans between now and May.”
                            <br/>
                            <br/>
                            Martin will wear the number 11 shirt.
                        </p>
                    </Col>  
                </Row>                    
            </div>
        )
    }
}
