import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import DB10 from '../../../assets/DB10.jpg'
export default class Trending6 extends Component {
    render() {
        return (
            <div className="trending">
                <h3 id="kit">The Iceman joins Henry in the PL Hall of Fame! <span role="img" aria-label="iceman icon">❄️</span></h3>
                <Row>
                    <Col lg={7} md={7} sm={12}>
                    {/* <ReactPlayer
                        style={{width: "auto"}}
                        url="https://www.youtube.com/watch?v=0sbBijhhvQ0?autoplay=1"
                    /> */}
                    <img src={DB10} alt="The King gets inducted in the PL Hall of Fame! (Source: @premierleague)" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            <b>Congratulations to Dennis Bergkamp, who joins Thierry Henry in the official Premier League Hall of Fame. </b>
                            <br/>
                            <br/>
                            The legendary Dutch striker becomes the sixth player to be named, joining his former Invincibles team-mate, Thierry Henry, alongside Alan Shearer, Roy Keane, Eric Cantona and Frank Lampard.
                            <br/>
                            <br/>
                            Henry scored a club-record 175 Premier League goals in 258 appearances for us, and netted more than 20 league goals in five consecutive seasons between 2001 and 2006 while 
                            winning the Premier League title twice and was a key member of our Invincibles team, who went unbeaten during the 2003/04 season. 
                            <br/>
                            <br/>
                            Bergkamp scored 87 goals in 315 Premier League appearances for us after signing from Inter Milan in 1995 - including arguably the greatest strike in Premier League history with his pirouette 
                            and finish at Newcastle in 2003. He also claimed 94 Premier League assists, a club record.
                        </p>
                    </Col>
                    <Col className="card-footer">
                        <span>May 19, 2021</span>
                    </Col>
                </Row>
            </div>
        )
    }
}