import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import white from '../../..//assets/white.jpg';

export default class Transfer5 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={white} alt="Bid for White Rejected!" />
                        <Card.Body>
                            <Card.Title>Bid for White Rejected!</Card.Title>
                            <Card.Text>
                            Brighton have rejected a £40m bid from Arsenal for defender Ben White. 
                            <br/>
                            <br/>
                            A second and improved bid is imminent from Arsenal.
                            <br/>
                            <br/>
                            <b>Source:</b> Sky Sports
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 16, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
