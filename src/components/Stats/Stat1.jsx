import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class Stat01 extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid className="stat1">
                    <Container>
                        <h5>
                            Arsenal have scored in all 25 of their #PL meetings with West Brom, the best 100% scoring record by one side against an opponent in the competition’s history.
                        </h5>
                        <h6><b>Source:</b> @premierleague</h6>
                        <p className="text-muted">January 02, 2021</p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}