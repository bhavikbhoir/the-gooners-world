import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import { FaNewspaper, FaHeart, FaSmile } from 'react-icons/fa'
import Hector from '/Users/bhvkb/the-gooners-world/src/assets/hector.jpg';

export default class Transfer5 extends Component {
    render() {
        return (
            <div>
             <Card>
                        <Card.Img variant="top" src={Hector} />
                        <Card.Body>
                            <Card.Title>Hector Bellerin is staying at Arsenal! 💪❤️</Card.Title>
                            <Card.Text>
                            Arsenal have turned down last PSG bid to sign Bellerin on loan - Florenzi is coming to PSG. 
                            <br />
                            <br />
                            <b>Source:</b> Fabrizio Romano
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 10, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
