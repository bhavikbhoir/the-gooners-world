import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import { FaNewspaper, FaHeart, FaSmile } from 'react-icons/fa'
import Emi from '/the-gooners-world/src/assets/emi.jpg';

export default class Transfer6 extends Component {
    render() {
        return (
            <div>
            <Card>
                        <Card.Img variant="top" src={Emi} />
                        <Card.Body>
                            <Card.Title>Emi Martinez to leave Arsenal. 💔</Card.Title>
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
