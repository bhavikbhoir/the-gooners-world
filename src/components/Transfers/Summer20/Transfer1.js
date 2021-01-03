import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import { FaNewspaper, FaHeart, FaSmile } from 'react-icons/fa'
import Signings from '/Users/bhvkb/the-gooners-world/src/assets/signings.jpg';

export default class Transfer1 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Signings}/>
                        <Card.Body>
                            <Card.Title>Arsenal signings so far!✍️⬇️</Card.Title>
                            <Card.Text>
                                <ul style={{listStyle: "none", marginLeft: "-2.4rem"}}>
                                    <li>Willian (Free)</li>
                                    <li>Gabriel Magalhaes (£25 million)</li>
                                    <li>Dani Ceballos (Loan)</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 7, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
