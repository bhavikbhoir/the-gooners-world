import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {FaHeart, FaHourglass, FaHourglassEnd} from 'react-icons/fa'
import { Row, Col, Card, CardColumns } from 'react-bootstrap'
import News2 from './News/News2';

export default class Trending extends Component {
    render() {
        return (
            <div className="trending">
                <h3>Trending 📈</h3>
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
                <h5 id="kit" style={{marginBottom:"1rem"}}><b>#AubaSigns <FaHourglassEnd /></b></h5>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>📝 Pierre-Emerick Aubameyang has signed a new three-year contract!</b>
                            <br/>
                            <br/>
                            Having put pen to paper on his new deal, our 31-year-old captain wanted to break the news on Arsenal.com and on social media by telling fans LIVE that he was staying, with the ambition to lift more trophies and leave a long-term legacy.
                            <br/>
                            <br/>
                            “Signing for this special club was never in doubt," Auba said. "It’s thanks to our fans, my team-mates, my family and everybody at this club that I feel like I belong here. I believe in Arsenal. We can achieve big things together. We have something exciting here and I believe the best is to come for Arsenal.”
                            {/* <br/>
                            <br/>
                            The new shirt colours are intended to represent the lights and atmosphere that illuminate Emirates Stadium during a night match. The shirt pattern was created from a custom set of tie dye prints. */}
                        </p>
                    </Col>                    
                    <Col lg={6} md={6} sm={12}>
                    <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=rHnYj8TwW5U"
                    />
                    </Col>
                </Row>
            </div>
        )
    }
}
