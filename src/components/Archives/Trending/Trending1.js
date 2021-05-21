import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart } from 'react-icons/fa'
import { Row, Col } from 'react-bootstrap'

export default class Trending1 extends Component {
    render() {
        return (
            <div className="trending">
                <h3 id="kit" style={{margin:"0.5rem 0"}}>Arsenal drop their third kit for the season 2020/21! <FaHeart /></h3>
                <Row>
                    <Col lg={8} md={8} sm={12}>
                    <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    />
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>This is Family.<span role="img" aria-label="Strong icon">💪</span></b>
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
                    <Col className="card-footer">
                        <span>August 31, 2020</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
