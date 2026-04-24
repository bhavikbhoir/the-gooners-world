import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import onana from '../../..//assets/onana.jpg';

export default class Transfer1 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={onana} alt="Gunner Onana?" />
                        <Card.Body>
                            <Card.Title>Gunner Onana?</Card.Title>
                            <Card.Text>
                            Andrè Onana has agreed personal terms with Arsenal for a contract until 2024 with option for another season. 
                            <br/>
                            <br/>
                            <b>Source:</b> @NicoSchira
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 01, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
