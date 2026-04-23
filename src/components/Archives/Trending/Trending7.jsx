import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import fixtures from '../../../assets/fixtures.jpg'
export default class Trending7 extends Component {
    render() {
        return (
            <div className="trending">
                <h3 id="kit" style={{marginBottom:"1rem"}}>Premier League Fixtures announced! <span role="img" aria-label="fixtures icon">🆚</span></h3>
                <Row>
                    <Col lg={7} md={7} sm={12}>
                    <img src={fixtures} alt="Premier League Fixtures announced! (Source: Arsenal.com)" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>The 2021/22 Premier League fixture list is out!</b>
                            <br/>
                            <br/>
                            We'll open the campaign with a trip across London to take on top-flight new boys Brentford, before hosting Chelsea at Emirates Stadium and then hitting the road to go to the champions, Manchester City.
                            <br/>
                            <br/>
                            Our first north London derby of the season comes on September 25 as we host Tottenham, with the reverse fixture taking place on January 15.
                            <br/>
                            <br/>
                            The run-in sees us welcome Leeds to Emirates Stadium on May 7, before a trip to St James’ Park to take on Newcastle and then hosting Everton on the final day.
                            <br/>
                            <br/>
                            Click <a href="https://www.arsenal.com/fixtures" target="_blank" rel="noopener noreferrer" role="button">here</a> for the complete fixture list!
                        </p>
                    </Col>
                    <Col className="card-footer">
                        <span>June 16, 2021</span>
                    </Col>
                </Row>
            </div>
        )
    }
}