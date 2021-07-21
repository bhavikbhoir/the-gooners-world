import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import nuno from '/the-gooners-world/src/assets/nuno.jpg';

export default class Transfer9 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={nuno} alt="Nuno is a Gunner!" />
                        <Card.Body>
                            <Card.Title>Nuno is a Gunner!</Card.Title>
                            <Card.Text>
                            Nuno Tavares has joined us from Benfica on a long-term contract.
                            <br/>
                            <br/>
                            The 21-year-old defender developed through the Benfica youth system, making his Benfica B debut in October 2018, before progressing into the first team squad. He made his first-team debut in the Portuguese Super Cup win over Sporting Lisbon in August 2019.
                            <br/>
                            <br/>
                            The young defender will join up with his new team-mates in the coming days after he has travelled from Portugal and completed the current isolation regulations for international arrivals into the UK. Nuno will wear the number 20 shirt.
                            <br/>
                            <br/>
                            We welcome Nuno to The Arsenal and wish him the best.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal official
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">July 10, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}