import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import third from '../assets/third.jpg'
export default class Trending extends Component {
    render() {
        return (
            <div className="trending">
                <h3 className="pb-0">Trending <span role="img" aria-label="trending news icon"> ✨</span></h3>
                <h5 id="kit" style={{marginBottom:"1rem"}}>The Blue Bolt is here.</h5>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            Arsenal released their new third kit for the 2021/22 season.
                            <br/>
                            <br/>
                            Our striking new kit takes inspiration from 90s style and culture and has a bold lightning pattern running throughout. 
                            <br/>
                            <br/>
                            The shirt is a combination of different tones of blue with a scarlet outline and will be accompanied with dark blue shorts and socks. 
                            <br/>
                            <br/>
                            The new kit will be worn on pitch for the first time in our Premier League curtain raiser against Brentford on Friday.
                            The new kit is available to buy today exclusively at Arsenal Direct, the Armoury and online and in-store with adidas. 
                        </p>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="p-0">
                    <img src={third} alt="Arsenal presents their new third kit for the " style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col className="card-footer">
                        <span>Aug 13, 2021</span>
                    </Col>
                </Row>
            </div>
        )
    }
}