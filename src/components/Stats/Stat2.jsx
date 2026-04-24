import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class Stat02 extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid className="stat2">
                    <Container>
                        <h5>
                            No Premier League side has more away clean sheets than Arsenal this season (5). 
                        </h5>
                        <br/>
                        <h6><b>Source:</b> @VBET_uk</h6>
                        <p className="text-muted">January 02, 2021</p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}