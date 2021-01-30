import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaHourglass, FaHourglassEnd} from 'react-icons/fa'
import { Row, Col, Card, CardColumns } from 'react-bootstrap'
import News2 from './News/News2';

export default class Trending extends Component {
    render() {
        return (
            <div className="trending">
                {/* <h3>Trending 📈</h3> */}
                {/* <h5 id="kit" style={{marginBottom:"1rem"}}><b>Arsenal drop their third kit for the season 2020/21! <FaHeart /></b></h5>
                <Row>
                    <Col lg={8} md={8} sm={12}>
                    <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    />
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>This is Family.💪</b>
                            <br/>
                            Introducing the new 2020/21 Third jersey.
                            <br/>
                            <br/>
                            The new strip will be worn on the pitch for the first time when we kick off the Premier League season against Fulham on Saturday.
                            <br/>
                            <br/>
                            The new shirt colours are intended to represent the lights and atmosphere that illuminate Emirates Stadium during a night match. The shirt pattern was created from a custom set of tie dye prints.
                        </p>
                    </Col>
                </Row> */}
                <h3 id="kit" style={{marginBottom:"1rem"}}><b>Thank You, Mesut! <span style={{color: "#f00000", fontSize: "2.5rem"}}>♥️</span></b></h3>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            {/* <h5><b>Thank You Mesut! 👋</b></h5>
                            <br/>
                            <br/> */}
                            Mesut Ozil leaves Arsenal for Fenerbahce today with 77 assists, 44 goals and four major trophies in 254 games. A certified club legend.
                            <br/>
                            <br/>
                            Thank you for everything Mesut. From that assist in the first game to breaking the trophy drought to producing various magical moments on the pitch to your excellent humanitarian work off the pitch.
                            <br/>
                            <br/>
                            In his goodbye, Mesut said, "It feels strange to be writing this message after such a long time here in London. 
                            Since the moment I arrived, it has felt like home.
                            It's difficult for me to put into words the love I feel for this club and the fans.
                            I will be a Gunner for life." 😥
                            <br/>
                            <br/>
                            We wish you the best in Turkey Mesut! <span style={{color: "#f00000"}}>#YaGunnersYa </span>👋
                            {/* <br/>
                            <br/>
                            The new shirt colours are intended to represent the lights and atmosphere that illuminate Emirates Stadium during a night match. The shirt pattern was created from a custom set of tie dye prints. */}
                        </p>
                    </Col>                    
                    <Col lg={6} md={6} sm={12}>
                    <ReactPlayer
                        style={{width: "auto"}}
                        url="https://youtu.be/CugiArs6BGA"
                    />
                    </Col>
                </Row>
            </div>
        )
    }
}
