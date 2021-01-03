import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import { FaNewspaper, FaHeart, FaSmile } from 'react-icons/fa'
import Holding from '/Users/bhvkb/the-gooners-world/src/assets/holding.jpg';

export default class Transfer2 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Holding}/>
                        <Card.Body>
                            <Card.Title>Rob Holding to stay at Arsenal 🔴</Card.Title>
                            <Card.Text>
                            Rob Holding set to stay at Arsenal after impressing Mikel Arteta in the recent games. Newcastle were interested in bringing him in on a loan deal but that won't happen now.
                            <br />
                            <br />
                            <b>Source:</b> Various
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 8, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
