import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import matteo from '/the-gooners-world/src/assets/matteo.jpg';

export default class Transfer6 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={matteo} alt="French duo leaves on loan!" />
                        <Card.Body>
                            <Card.Title>French duo leaves on loan!</Card.Title>
                            <Card.Text>
                            Marseille have signed Arsenal duo Matteo Guendouzi and William Saliba on loan.
                            <br/>
                            <br/>
                            This is Matteo's second term out on loan while it's a thrid loan spell for Saliba. We wish them both the best in France.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal official and David Ornstein
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">July 12, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
