import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import sambi from '../../../assets/sambi.jpg'
export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3 id="kit" style={{marginBottom:"1rem"}}>Welcome Sambi Lokonga!</h3>
                <Row>                  
                    <Col lg={6} md={12} sm={12} className="pt-0 pr-1 breaking-asset">
                    <img src={sambi} alt="Welcome Sambi Lokonga!" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col lg={6} md={12} sm={12} className="breaking-content">
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            Albert Sambi Lokonga has joined us from Anderlecht on a long-term contract.
                            <br/>
                            <br/>
                            The 21-year-old midfielder came through the Belgian club's youth system after joining in 2014 as a 15-year-old and signing his first professional contract in November 2017.
                            <br/>
                            <br/>
                            Mikel Arteta said: “Albert is a very intelligent player who has shown great maturity in his performances during his development. He has been coached well by Vincent Kompany and his team at Anderlecht. I know Vincent very well and he talks so highly about Albert and the positive impact he had to Anderlecht in recent seasons. We’re confident Albert’s ready for the next stage in his development and we’re looking forward to welcoming a new member to our squad with his quality and presence.”
                            <br/>
                            <br/>
                            The midfielder will join up with his new team-mates in the coming days after he has completed the current isolation regulations for international arrivals into the UK.
                            <br/>
                            <br/>
                            Albert will wear the No 23 shirt and have the name Sambi on the back.
                        </p>
                    </Col>  
                    <Col className="card-footer">
                        <span>July 19, 2021</span>
                    </Col>
                </Row>                    
            </div>
        )
    }
}
