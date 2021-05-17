import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import KTNews from '/the-gooners-world/src/assets/KTNews.jpg';

export default class News16 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={KTNews}/>
                        <Card.Body>
                            <Card.Title>Tierney out for the season.</Card.Title>
                            <Card.Text>
                            Mikel Arteta has given us an update on Kieran Tierney's fitness and it's not good news.
                            <br/>
                            <br/>
                            Tierney was taken off in our last game against Liverpool.
                            <br/>
                            <br/>
                            The length of his recovery was unknown then but the Boss has confirmed that the Scottish International will be out for the season.
                            <br/>
                            <br/>
                            We wish KT a speedy recovery.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">April 11, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
