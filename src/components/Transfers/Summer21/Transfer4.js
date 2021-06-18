import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import mod from '/the-gooners-world/src/assets/mod.jpg';

export default class Transfer4 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={mod} alt="Arsenal's search for #10 continues!" />
                        <Card.Body>
                            <Card.Title>Arsenal's 🔍 for #10 continues! <span role="img" aria-label="search-icon"></span></Card.Title>
                            <Card.Text>
                            Martin Odegaard will stay at Real Madrid as things stand. 
                            Arsenal's search for #10 continues this summer with James Madison rumoured to be another target on the list.
                            <br/>
                            <br/>
                            Meanwhile, Arsenal have submitted a €15m offer for Anderlecht midfielder Lokonga.
                            <br/>
                            <br/>
                            <b>Source:</b> @TheAthleticUK
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 10, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
