import React, { Component } from 'react'
import ReactPlayer from "react-player";
import { Row, Col } from 'react-bootstrap'

export default class Trending2 extends Component {
    render() {
        return (
            <div className="trending">
                <h3 id="kit" style={{margin:"0.5rem 0"}}>Thank You, Mesut! <span role="img" aria-label="Thank you Mesut!" style={{color: "#f00000", fontSize: "2.5rem"}}>♥️</span></h3>
                <Row>                   
                    <Col lg={6} md={6} sm={12}>
                    <ReactPlayer
                        style={{width: "auto"}}
                        url="https://youtu.be/CugiArs6BGA"
                    />
                    </Col>
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
                    <Col className="card-footer">
                        <span>Jan 31, 2021</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
