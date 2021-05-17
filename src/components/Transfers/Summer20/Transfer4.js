import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Aouar from '/the-gooners-world/src/assets/aouar.jpg';

export default class Transfer4 extends Component {
    render() {
        return (
            <div>
             <Card>
                        <Card.Img variant="top" src={Aouar}/>
                        <Card.Body>
                            <Card.Title>Aouar latest transfer update <span role="img" aria-label="red blue icon">🔴🔵</span></Card.Title>
                            <Card.Text>
                            Lyon and Arsenal are currently locked in talks over the structure of the deal. 
                            <br />
                            <br />
                            <b>Source:</b> Various
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 9, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
