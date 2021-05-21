import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class Stat06 extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid className="stat6">
                    <Container>
                        <h5>
                        Arsenal completed their first #PL double over Chelsea since the 2003/04 season, with their first victory at Stamford Bridge since that famous 5-3 in 2011.
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