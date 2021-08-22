import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import dd from '../assets/dd.png'
export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3 className="pb-0">Breaking <span role="img" aria-label="breaking news icon"> 🔥</span></h3>
                <h5 id="kit" style={{marginBottom:"1rem"}}>Friday Delight for the Gunners! <span role="img" aria-label="pen icon">🖊️</span></h5>
                <Row>                  
                    <Col lg={6} md={12} sm={12} className="pt-0 pr-1 breaking-asset">
                    <img src={dd} alt="Friday Delight for the Gunners!" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col lg={6} md={12} sm={12} className="breaking-content">
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            It was a double delight for the Gooners as Arsenal announced two signings in Martin Ødegaard and Aaron Ramsdale.
                            <br/>
                            <br/>
                            Martin's return to London was announced first as he signed a five years contract with the Transfer fee reported to be €40m. He will be taking up the #8 and Arsenal are hopeful that he will be involved against Chelsea.
                            <br/>
                            <br/>
                            Aaron Ramsdale's announcement completed a delightful friday for the Gunners. Arsenal reached an agreement with Sheffield United to sign Aaron for £24m + £6m in add-ons (only likely to apply if/when 23yo is established 1st choice) on a proposed 4yrs + 1 option deal.
                        </p>
                    </Col>  
                    <Col className="card-footer">
                        <span>Aug 20, 2021</span>
                    </Col>
                </Row>                    
            </div>
        )
    }
}
