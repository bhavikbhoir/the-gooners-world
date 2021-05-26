import React, { Component } from 'react'
import {FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import ARSWES from '../../assets/ARSWES.jpg';

export default class Fixtures12 extends Component {
    btnClick() {
        window.open("https://youtu.be/NmLQV5GZod4");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Strong response from the Gunners<span role="img" aria-label="red-white icon"> 🔴⚪️</span></b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>ARSENAL 3 - 1 WEST BROMWICH ALBION</b>
                            <br/>
                            <br/>
                            A strong response was expected from the Gunners after a disappointing result against Villareal which saw us drop out of Europe.
                            <br/>
                            <br/>
                            Three fine goals from Emile Smith Rowe, Nicolas Pepe and Willian saw us claim a 3-1 victory against West Bromwich Albion on Sunday.
                            <br/>
                            <br/> 
                            Two excellent goals from Emile Smith Rowe who scored his first ever Premier League goal and Nicolas Pepe saw us leading 2-0 at the break.
                            <br/>
                            <br/>                         
                            The Baggies pulled one back when Pereira raced at the heart of our defence and fired a low shot beyond Bernd Leno and into the far corner but a 90th minute free kick from Willian saw 
                            us claim a comfortable win over the visitors. This was Willian's first goal for the Gunners.
                            <br/>
                            <br/>   
                            We sit 9th in the table with 52 points and 6 points away from 5th place West Ham. The gunners will hope that other results to go their way in order to have a chance at 
                            qualifying for Europe next season.
                            <br/>
                            <br/>
                            <i>We play Chelsea next in our Premier League clash.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={ARSWES} alt="ESR and Saka celebrate former's goal against the Baggies."/>
                    <caption>ESR and Saka celebrate former's goal against the Baggies. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
