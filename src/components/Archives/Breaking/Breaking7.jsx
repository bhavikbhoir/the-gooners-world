import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import benwhite from '../../../assets/benwhite.jpg'
export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3 id="kit" style={{marginBottom:"1rem"}}>Ben White is a Gunner! <span role="img" aria-label="no. 4 icon">4️⃣</span></h3>
                <Row>                  
                    <Col lg={6} md={12} sm={12} className="pt-0 pr-1 breaking-asset">
                    <img src={benwhite} alt="Ben White is a Gunner!" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col lg={6} md={12} sm={12} className="breaking-content">
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            Ben White has joined us from Brighton & Hove Albion on a long-term contract.
                            <br/>
                            <br/>
                            The 23-year-old defender, who has proved to be one of the Premier League’s finest young prospects, joins us after spending the summer as part of the England squad at the Euros.
                            <br/>
                            <br/>
                            Technical director Edu said: “Ben has been a key target this summer. He has so many qualities which make us so excited he’s joining us. Ben’s a young English player with a great future. He’s very strong defensively, good on the ball with a great passing range. We’re delighted Ben’s signed and we look forward to him growing with us.”
                            <br/>
                            <br/>
                            Mikel Arteta said: “Ben was a top target for us and it’s great that we’ve completed his signing. Ben has been educated with two very good clubs, Brighton and Leeds, in recent seasons. He has benefitted well from two very good coaching set-ups and has shown with both Brighton and on loan with Leeds what a strong talent he is."
                            <br/>
                            <br/>
                            Ben will wear the No 4 shirt and will immediately join up with his new team-mates ahead of The Mind Series friendly match at home to Chelsea on Sunday.
                        </p>
                    </Col>  
                    <Col className="card-footer">
                        <span>July 30, 2021</span>
                    </Col>
                </Row>                    
            </div>
        )
    }
}
