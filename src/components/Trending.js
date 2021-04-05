import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaHourglass, FaHourglassEnd} from 'react-icons/fa'
import { Row, Col, Card, CardColumns } from 'react-bootstrap'
import News2 from './News/News2';
import kit from '../../src/assets/424Kit.jpg'

export default class Trending extends Component {
    render() {
        return (
            <div className="trending">
                <h3>Trending 📈</h3>
                <h5 id="kit" style={{marginBottom:"1rem"}}><b>Arsenal drop new limited edition kit! 🖤</b></h5>
                <Row>
                    <Col lg={8} md={8} sm={12}>
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={kit} alt="Arsenal's limited edition collection." style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>adidas x 424 x Arsenal – limited collection</b>
                            <br/>
                            Arsenal and adidas present a limited-edition collection in collaboration with LA streetwear brand 424, dropping March 16 on Arsenal Direct.
                            <br/>
                            <br/>
                            Available March 16 through the #adidasCONFIRMED app and select retail partners.
                            {/* The new strip will be worn on the pitch for the first time when we kick off the Premier League season against Fulham on Saturday.
                            <br/>
                            <br/>
                            The new shirt colours are intended to represent the lights and atmosphere that illuminate Emirates Stadium during a night match. The shirt pattern was created from a custom set of tie dye prints. */}
                        </p>
                    </Col>
                </Row>
            </div>
        )
    }
}
