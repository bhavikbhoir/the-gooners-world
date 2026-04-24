import React, { Component } from 'react'
import { FaInfoCircle, FaPlay} from 'react-icons/fa'
import { Row, Col, Button } from 'react-bootstrap'
import SFUvARS from '../../assets/SFUvARS.jpg';

export default class FixturesArchive6 extends Component {
    btnClick() {
        window.open("https://youtu.be/nJ6utMaEeJA");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Row> 
                    <Col lg={6} md={12} sm={12}>
                        <h5 style={{marginBottom:"1rem"}}><b>Convincing victory at Bramall Lane 🔴⚪️</b></h5>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>SHEFFIELD UNITED 0 - 3 ARSENAL</b>
                            <br/>
                            <br/>
                            Alexandre Lacazette claimed his 50th Premier League goal as we returned to winning ways in convincing fashion at Bramall Lane.
                            <br/>
                            <br/>
                            The Frenchman opened the scoring with his 49th in the competition - applying the finishing touch to a wonderful team move - before sealing the win late on with goal number 50, tucking home Thomas Partey's excellent throughball.
                            <br/>
                            <br/> 
                            In between those two goals, Gabriel Martinelli scored his first for 15 months, after good work from Nicolas Pepe.
                            <br/>
                            <br/>                         
                            There was a welcome clean sheet as well, as we prepared for Thursday's must-win encounter in Prague in the perfect manner.
                            {/* <br/>
                            <br/>   
                            But the rest of the game was essentially about our efforts to find an equaliser and ended in a defeat. */}
                            <br/>
                            <br/>
                            <i>We host Slavia Prague in the second leg of our Europa League Quater Finals clash.</i>
                        </p>
                    </Col>
                    <Col lg={6} md={12} sm={12} id="celebrate">
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={SFUvARS} alt="Lacazette celebrating his 50th Arsenal goal in the win against Sheffield United."/>
                    <caption>Lacazette celebrating his 50th Arsenal goal in the win against Sheffield United. (Source: Arsenal.com)</caption>
                    </Col>
                    <Col className="highlights">                    
                    <Button variant="danger" onClick={this.btnClick}><FaPlay /> Watch Highlights</Button>
                    </Col>
                </Row>
                    
            </div>
        )
    }
}
