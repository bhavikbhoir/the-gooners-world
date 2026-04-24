import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class Stat05 extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid className="stat5">
                    <Container>
                        <h5>
                        No fixture in Premier League history has seen more goals scored than Arsenal vs Liverpool (166)
                        </h5>
                        <br/>
                        <h6><b>Source:</b> @premierleague</h6>
                        <p className="text-muted">April 02, 2021</p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}