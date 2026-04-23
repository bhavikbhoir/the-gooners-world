import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Emi from '../../../assets/emi.jpg';

export default class Transfer6 extends Component {
    render() {
        return (
            <div>
            <Card>
                        <Card.Img variant="top" src={Emi} alt="Emi Martinez to leave Arsenal." />
                        <Card.Body>
                            <Card.Title>Emi Martinez to leave Arsenal. <span role="img" aria-label="heartbreak icon"> 💔</span></Card.Title>
                            <Card.Text>
                                Martinez has already agreed personal terms with Villa on a four-year contract, worth in the region of £60,000 per week. 
                                <br />
                                <br />
                                <b>Source:</b> The Independent
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 10, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
