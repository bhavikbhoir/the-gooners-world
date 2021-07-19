import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/ktsigns.jpg';

export default class News24 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={img} alt="More of KT!"/>
                        <Card.Body>
                            <Card.Title>More of KT!</Card.Title>
                            <Card.Text>
                            Kieran Tierney has signed a new 5-year contract at Arsenal. 
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal Official
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 25, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
