import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/HBARS.jpg';

export default class News22 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={img} alt="Hibernian vs Arsenal"/>
                        <Card.Body>
                            <Card.Title>Hibernian <span role="img" aria-label="handshake icon">🤝</span> Arsenal!</Card.Title>
                            <Card.Text>
                            Scottish Cup finalists Hinernian FC announces pre-season friendly with the Gunners!
                            <br/>
                            <br/>
                            The match will take place on 13 July at Easter Road. The match will kick off at 6pm (UK Time).
                            <br/>
                            <br/>
                            Mikel Arteta said: “We’re pleased to confirm our second game in Scotland as part of a week-long training camp that will help us prepare for the 2021/22 season."
                            <br/>
                            <br/>
                            <b>Source:</b> Hibernian Football Club
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">May 18, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
