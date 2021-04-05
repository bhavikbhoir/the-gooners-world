import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import AubaNews from '/the-gooners-world/src/assets/AubaNews.jpg';

export default class News14 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={AubaNews}/>
                        <Card.Body>
                            <Card.Title>Why was Aubameyang dropped?</Card.Title>
                            <Card.Text>
                            The big news that came ahead of our derby clash was that Club Captain Pierre-Emerick Aubameyang was dropped to the bench for disciplinary issues.
                            <br/>
                            <br/>
                            Sources say that this decision was taken after the captain reported late when squad met up earlier today. Believed not to be the first time & falls out of line with club’s matchday protocols.
                            <br/>
                            <br/>
                            <b>Source:</b> David Ornstein
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Mar 14, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
