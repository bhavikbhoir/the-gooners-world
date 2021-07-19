import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import bwhite from '/the-gooners-world/src/assets/bwhite.jpg';

export default class Transfer7 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={bwhite} alt="White move edges closer!" />
                        <Card.Body>
                            <Card.Title>White move edges closer!</Card.Title>
                            <Card.Text>
                            Arsenal moving closer to agreement with Brighton for Ben White. 
                            <br/>
                            <br/>
                            BHAFC want guaranteed ~£50m, Arsenal offering ~£45m + £5m. Face-to-face talks have taken place & negotiations continue over add-ons, payment structure etc.
                            <br/>
                            <br/>
                            <b>Source:</b> David Ornstein
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 24, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
