import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Luiz from '/the-gooners-world/src/assets/luiz-white.jpg';

export default class News7 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Luiz} alt="Luiz to miss season opener!" />
                        <Card.Body>
                            <Card.Title>Luiz to miss season opener <span role="img" aria-label="cross icon">❌</span></Card.Title>
                            <Card.Text>
                            Here is the latest team news update from our medical team ahead of Saturday’s match at Fulham.
                            <br/>
                            <br/>
                            Arsenal Defender David Luiz will be unavailable for Arsenal's season opener this weekend due to a neck injury.
                            <br/>
                            <br/>
                            Mari, Chambers, Mustafi, Martinelli, Sokratis, and Smith-Row amongst others who'll be unavailable too due to injuries.  
                            <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 11, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
