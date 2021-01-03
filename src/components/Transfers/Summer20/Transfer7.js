import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import Emi from '/the-gooners-world/src/assets/martinez.jpg';

export default class Transfer7 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Emi} />
                        <Card.Body>
                            <Card.Title>Bid accepted for Emi Martinez!🧤</Card.Title>
                            <Card.Text>
                            Arsenal have accepted an offer from Aston Villa for goalkeeper Emiliano Martinez.
                            <br/>
                            <br/>
                            Reports suggest that the Argentine has already passed his medical this saturday afternoon. 
                            <br/>
                            <br/>
                            Martinez was left out of Arsenal's squad for the premier league game against Fulham.
                            <br/>
                            <br/>
                            <b>Source:</b> Various
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 12, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
