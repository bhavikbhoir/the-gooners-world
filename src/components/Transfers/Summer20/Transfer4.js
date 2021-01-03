import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import { FaNewspaper, FaHeart, FaSmile } from 'react-icons/fa'
import Aouar from '/Users/bhvkb/the-gooners-world/src/assets/aouar.jpg';

export default class Transfer4 extends Component {
    render() {
        return (
            <div>
             <Card>
                        <Card.Img variant="top" src={Aouar}/>
                        <Card.Body>
                            <Card.Title>Aouar latest transfer update 🔴🔵</Card.Title>
                            <Card.Text>
                            Lyon and Arsenal are currently locked in talks over the structure of the deal. 
                            <br />
                            <br />
                            <b>Source:</b> Various
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 9, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
