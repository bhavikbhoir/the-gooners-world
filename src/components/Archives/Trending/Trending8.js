import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import kit2122 from '../../../assets/kit2122.jpg'
export default class Trending8 extends Component {
    render() {
        return (
            <div className="trending">
                <h3 id="kit" style={{marginBottom:"1rem"}}>The new home kit is here! <span role="img" aria-label="kit2122 icon">😍</span></h3>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            Our new adidas home kit for 2021/22 has finally been revealed!
                            <br/>
                            <br/>
                            As excitement builds towards a new season with our fans back at Emirates Stadium and Meadow Park, we’re delighted to reveal our new home kit which will be worn by our women’s, men’s and academy teams.
                            <br/>
                            <br/>
                            The new kit will be worn on pitch for the first time in Saturday's commemorative friendly against Rangers, which forms part of the Scottish champions’ 150th anniversary celebrations. 
                            <br/>
                            <br/>
                            The new kit is available to buy today exclusively at Arsenal Direct, the Armoury and online and in-store with adidas. Wider release with select retailers will be available from July 23.
                        </p>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="p-0">
                    <img src={kit2122} alt="The new home kit is here! (Source: Arsenal.com)" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col className="card-footer">
                        <span>July 16, 2021</span>
                    </Col>
                </Row>
            </div>
        )
    }
}