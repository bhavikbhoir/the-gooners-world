import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import esr10 from '../../../assets/esr10.jpg'
export default class Trending9 extends Component {
    render() {
        return (
            <div className="trending">
                <h3 id="kit" style={{marginBottom:"1rem"}}>New Contract. <span  role="img" aria-label="pen icon">🖊️</span> New Number. <span role="img" aria-label="esr10 icon">🔟</span></h3>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            Emile Smith Rowe signs new long-term deal
                            <br/>
                            <br/>
                            The attacking midfielder has been with us since the age of nine and progressed through the ranks at our Hale End academy, featuring for all our youth sides during his development with the club. 
                            <br/>
                            <br/>
                            To coincide with his new long-term contract, Arsenal also revealed that Emile will wear the No 10 shirt for the 2021/22 season.  
                            <br/>
                            <br/>
                            On this occasion, Smith Rowe said, "I can't wait to carry on playing for this wonderful club. [Signing my new contract] means so much to me. I've been waiting for it, and to carry on playing for this club, it means so much."    
                        </p>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="p-0">
                    <img src={esr10} alt="Emile Smith Rowe signs new long-term deal" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col className="card-footer">
                        <span>July 22, 2021</span>
                    </Col>
                </Row>
            </div>
        )
    }
}