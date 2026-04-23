import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Hector from '/the-gooners-world/src/assets/hector-green.jpg';
import { FaHeart } from 'react-icons/fa';
export default class News11 extends Component {
    render() {
        return (
            <div>
                <Card id="green">
                        <Card.Img variant="top" src={Hector} alt="Bellerin partners with Forest Green Rovers FC"/>
                        <Card.Body>
                            <Card.Title>Hector <span role="img" aria-label="handshake icon">🤝</span> Forest Green Rovers FC</Card.Title>
                            <Card.Text>
                            Arsenal defender Hector Bellerin has become the second-largest shareholder in League Two side Forest Green Rovers, recognised by FIFA & the United Nations as the world’s greenest football club. <FaHeart /> <br />
                            <br />
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 8, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
