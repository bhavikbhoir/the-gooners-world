import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/esrvilla.jpg';

export default class News23 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={img} alt="Hibernian vs Arsenal"/>
                        <Card.Body>
                            <Card.Title>Arsenal reject ESR's Bid!</Card.Title>
                            <Card.Text>
                            Arsenal reject bid of around £25m from Aston Villa for midfielder Emile Smith Rowe. 
                            <br/>
                            <br/>
                            Arsenal working to renew 20yo’s contract — which ends in 2023 — & have no interest in selling.
                            <br/>
                            <br/>
                            <b>Source:</b> @TheAthleticUK
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 16, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
