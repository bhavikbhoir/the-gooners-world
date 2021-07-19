import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import nuno from '../assets/nuno.jpg'
export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3 className="pb-0">Breaking <span role="img" aria-label="breaking news icon"> 🔥</span></h3>
                <h5 id="kit" style={{marginBottom:"1rem"}}>Nuno is a Gunner!</h5>
                <Row>                  
                    <Col lg={6} md={12} sm={12} className="pt-0 pr-1 breaking-asset">
                    <img src={nuno} alt="Nuno is a Gunner!" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col lg={6} md={12} sm={12} className="breaking-content">
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            Nuno Tavares has joined us from Benfica on a long-term contract.
                            <br/>
                            <br/>
                            The 21-year-old defender developed through the Benfica youth system, making his Benfica B debut in October 2018, before progressing into the first team squad. He made his first-team debut in the Portuguese Super Cup win over Sporting Lisbon in August 2019.
                            <br/>
                            <br/>
                            The young defender will join up with his new team-mates in the coming days after he has travelled from Portugal and completed the current isolation regulations for international arrivals into the UK. Nuno will wear the number 20 shirt.
                            <br/>
                            <br/>
                            We welcome Nuno to The Arsenal and wish him the best.
                        </p>
                    </Col>  
                    <Col className="card-footer">
                        <span>July 10, 2021</span>
                    </Col>
                </Row>                    
            </div>
        )
    }
}
