import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/gx.jpg';

export default class News26 extends Component {
    render() {
        return (
            <div className="top-news">
                <Card>
                        <Card.Img variant="top" src={img} alt="Granit will stay!"/>
                        <Card.Body>
                            <Card.Title>Granit will stay!</Card.Title>
                            <Card.Text>
                            Arsenal boss Mikel Arteta has confirmed midfielder Granit Xhaka will NOT be leaving the club this summer.
                            <br/>
                            <br/>
                            It was heavily rumoured that the Swiss captain will be leaving Arsenal with Roma said to be the destination club but the Boss has just put an end to that speculation.
                            “Granit is going to stay with us. He is a key member of our squad.”, said Mikel Arteta on Xhaka's transfer rumour.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal Official
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Aug 01, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
