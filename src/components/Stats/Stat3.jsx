import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class Stat03 extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid className="stat3">
                    <Container>
                        <h5>
                        Mesut Özil has created 737 chances for Arsenal since making his debut in 2013 and 3.2 per 90 minutes which is the highest of any Arsenal player since records began. 
                        </h5>
                        <br/>
                        <h6><b>Source:</b> @MesutOzilStats</h6>
                        <p className="text-muted">January 09, 2021</p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}