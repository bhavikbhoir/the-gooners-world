import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import papa from '/the-gooners-world/src/assets/papa.jpg';

export default class Transfer15 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={papa} />
                        <Card.Body>
                            <Card.Title>Sokratis departs!</Card.Title>
                            <Card.Text>
                            Working closely with Sokratis and his team, Arsenal have decided to cancel his contract by mutual consent. 
                            <br/>
                            <br/>
                            The Greek international defender joined us from Borussia Dortmund in July 2018 and made 69 appearances for us. He was part of the Emirates FA Cup-winning squad in August and played 12 matches during our run to the Europa League final in 2019.
                            <br/>
                            <br/>
                            Technical director Edu said: “On behalf of Mikel, our coaches, players and everyone at the club, I would like to thank Papa for his contribution to the club. 
                            <br/>
                            <br/>
                            We wish Papa the best for the future!
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Jan 20, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
