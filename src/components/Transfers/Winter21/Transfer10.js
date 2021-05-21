import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Kola from '/the-gooners-world/src/assets/kola.jpg';

export default class Transfer10 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Kola} alt="Kolasinac joins Schalke!" />
                        <Card.Body>
                            <Card.Title>Kolasinac joins Schalke!<span role="img" aria-label="schalke icon"> 🔵</span></Card.Title>
                            <Card.Text>
                            Sead Kolasinac has agreed to join Bundesliga side Schalke on loan for the remainder of the season
                            <br/>
                            <br/>
                            The Bosnia & Herzegovina international will be returning to the club he joined as a youth player and spent five years in their first team before signing for us in June 2017.
                            <br/>
                            <br/>
                            Technical director Edu said: “Sead needs to be playing regularly, so we have decided together that a move back to Germany with Schalke will benefit him at this moment. We will be keeping in close contact with Sead, and wish him huge success for the remainder of the season with Schalke.”
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Dec 31, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
