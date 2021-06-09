import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import img from '../assets/recap.jpg';
import elneny from '../assets/elneny.jpg';

export default class Recap extends Component {
    render() {
        return (
            <div className="recap">
                <h3 id="kit" style={{margin:"1rem 0", textAlign: "left"}}>Season Recap <span role="img" aria-label="recap icon">🔙</span></h3>
                <Row>
                    <Col sm={12} className="pr-0">
                        <Row>
                            <Col lg={6} sm={12}>
                            <img src={img} alt="Season Recap" style={{width: "100%", height: "100%"}}/>
                            </Col>
                            <Col lg={6} sm={12} className="pr-0">
                                <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                                    <h5 className="title">Season Review <span role="img" aria-label="review icon">📆</span></h5>
                                        The Gunners finished 8th in the Premier league with 61 points (18W 7D 13D) scoring joint third most number of goals (68) with Lacazette finishing 
                                        as our top scorer in the PL with 13 goals. 
                                        <br/>
                                        <br/>
                                        Arsenal's excellent run in Europe came to end at the hands of Villarreal after the semi-final tie ended 1-1 on aggegrate with the Spanish side going ahead on away goals.
                                        <br/>
                                        <br/>
                                        Our domestic cup runs weren't upto to the mark this season as the Holders went out against Southampton after losing 1-0 in the FA Cup 4th round. We however managed to 
                                        reach the Quater finals of the EFL Cup but were outdone by the League Champions Manchester City in a 4-1 loss to the Gunners.
                                        <br/>
                                        <br/>
                                        European spot looked achievable until the last few minutes of the season but the results elsewhere didn't go in our favor and the Gunners will be playing their first season
                                        outside of Europe since 95/96.
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} className="mt-2 p-0">
                    <Row>
                            <Col lg={6} sm={12}>
                                <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                                    <h5 className="title">Season Awards <span role="img" aria-label="medal icon">🥇</span></h5>
                                        Bukayo Saka was voted the 2020/21 Player of the Season by all the fans around the world. 
                                        <br/>
                                        <br/>
                                        It has been a phenomenal season for Bukayo, having earned his place in England's Euro squad earlier this month and also winning the LFA young player of the season award.
                                        Saka was also voted as The Gooners World's Player of the season last month. Bukayo's contributions this season has also earned him a nomination in PFA 
                                        young player's of the season shortlist.
                                        <br/>
                                        <br/>
                                        Nico Pepe and Kieran Tierney finished on second and third positions respectively in Arsenal's official player of the season awards.
                                        <br/>
                                        <br/>
                                        Mohamed Elneny’s stunner against Dundalk in our Europa League group-stage match in Dublin was voted Arsenal's Goal of the Season 20/21. 
                                        <br/>
                                        <br/>
                                        Elneny’s goal received 31 per cent of the votes cast, with Kieran Tierney’s individual effort on the road at West Bromwich Albion finishing in second with 21 per cent.
                                        And, Nicolas Pepe’s fine strike against the Baggies at Emirates Stadium finished in third.
                                        <br/>
                                        <br/>
                                        The Gunners will be seen in action next against Hibernian on July 13. The Premier League season kicks off on Saturday, August 14.
                                </p>
                            </Col>
                            <Col lg={6} sm={12} className="p-0">
                            <img src={elneny} alt="elneny goal" style={{width: "100%", height: "100%"}}/>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col className="card-footer" style={{textAlign: "left"}}>
                        <span>June 05, 2021</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
