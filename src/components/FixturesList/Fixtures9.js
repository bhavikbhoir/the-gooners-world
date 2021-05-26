import React, { Component } from 'react'
import {FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import ARSEVE from '../../assets/ARSEVE.jpg';

export default class Fixtures9 extends Component {
    btnClick() {
        window.open("https://youtu.be/Yo0fMPPMhz8");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Disappointment against the Toffees<span role="img" aria-label="red-white icon"> 🔴⚪️</span></b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>ARSENAL 0 - 1 EVERTON</b>
                            <br/>
                            <br/>
                            A second half Bernd Leno own goal condemned us to a home defeat against Everton on Friday night.
                            <br/>
                            <br/>
                            Mikel Arteta made six changes from the side that drew with Fulham last time out, the most notable of which saw Eddie Nketiah lead the line with both Alex Lacazette and Pierre-Emerick Aubameyang ruled out.
                            <br/>
                            <br/> 
                            In the second half, we’d been awarded a penalty when Dani Ceballos was tripped in the box by Richarlison, but Nicolas Pepe was adjudged to be millimetres offside and it was chalked off by VAR.
                            <br/>
                            <br/>                         
                            With less than 15 minutes remaining, the visitors hit us on the break as Richarlison got past Granit Xhaka in the box and hit a low cross that hit Leno and went through his legs and in.
                            {/* <br/>
                            <br/>   
                            But the rest of the game was essentially about our efforts to find an equaliser and ended in a defeat. */}
                            <br/>
                            <br/>
                            <i>We play Villarreal next in the first leg of our Europa League clash.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={ARSEVE} alt="Rob Holding in action against Everton."/>
                    <caption>Rob Holding in action against Everton. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
