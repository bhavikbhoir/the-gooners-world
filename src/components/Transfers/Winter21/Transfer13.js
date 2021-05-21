import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import willy from '/the-gooners-world/src/assets/willy.jpg';

export default class Transfer13 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={willy} alt="Saliba joins Nice!" />
                        <Card.Body>
                            <Card.Title>Saliba joins Nice!</Card.Title>
                            <Card.Text>
                            William Saliba has joined French Ligue 1 side Nice on loan for the remainder of the season.
                            <br/>
                            <br/>
                            Technical director Edu said: “William Saliba is a player with a huge amount of talent and potential. We’re confident he will have a great career with us but we must remember that he is still only 19 years old and has a lot of time ahead of him.
                            <br/>
                            <br/>
                            We wish William all the best in France!
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Jan 07, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
