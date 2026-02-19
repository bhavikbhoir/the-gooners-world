import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Signings from '../../..//assets/signings.jpg';

export default class Transfer1 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Signings} alt="Arsenal signings so far!" />
                        <Card.Body>
                            <Card.Title>Arsenal signings so far!<span role="img" aria-label="signings icon"> ✍️⬇️</span></Card.Title>
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
