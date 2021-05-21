import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Hector from '/the-gooners-world/src/assets/hector.jpg';

export default class Transfer5 extends Component {
    render() {
        return (
            <div>
             <Card>
                        <Card.Img variant="top" src={Hector} alt="Hector Bellerin is staying at Arsenal!" />
                        <Card.Body>
                            <Card.Title>Hector Bellerin is staying at Arsenal! <span role="img" aria-label="heart icon">💪❤️</span></Card.Title>
                            <Card.Text>
                            Arsenal have turned down last PSG bid to sign Bellerin on loan - Florenzi is coming to PSG. 
                            <br />
                            <br />
                            <b>Source:</b> Fabrizio Romano
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 10, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
