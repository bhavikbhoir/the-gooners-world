import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class Stat07 extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid className="stat7">
                    <Container>
                        <h5>
                        Only Man City (nine) have kept more away clean sheets than Arsenal (eight) this season.
                        </h5>
                        <br/>
                        <h6><b>Source:</b> @premierleague</h6>
                        <p className="text-muted">May 12, 2021</p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}