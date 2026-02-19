import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Holding from '../../..//assets/holding.jpg';

export default class Transfer2 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Holding} alt="Rob Holding to stay at Arsenal" />
                        <Card.Body>
                            <Card.Title>Rob Holding to stay at Arsenal <span role="img" aria-label="red icon">🔴</span></Card.Title>
                            <Card.Text>
                            Rob Holding set to stay at Arsenal after impressing Mikel Arteta in the recent games. Newcastle were interested in bringing him in on a loan deal but that won't happen now.
                            <br />
                            <br />
                            <b>Source:</b> Various
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 8, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
