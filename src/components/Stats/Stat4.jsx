import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class Stat04 extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid className="stat4">
                    <Container>
                        <h5>
                        Tottenham are 1 win away (475) from equalling Arsene Wenger's win total (476) in the Premier League. However, they have played 277 games more than Arsene. 
                        <br/>BOSS 👔❤️
                        </h5>
                        <br/>
                        <h6><b>Source:</b> @ESPNUK</h6>
                        <p className="text-muted">March 21, 2021</p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}