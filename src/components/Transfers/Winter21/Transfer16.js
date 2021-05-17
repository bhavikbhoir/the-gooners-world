import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import odegaard from '/the-gooners-world/src/assets/odegaard.jpg';

export default class Transfer15 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={odegaard} />
                        <Card.Body>
                            <Card.Title>Ødegaard Arrival immenant!</Card.Title>
                            <Card.Text>
                            Martin Ødegaard to Arsenal is a done deal! The agreement has been reached after last contacts today between #AFC and Real Madrid.
                            <br/>
                            <br/>
                            Loan until the end of the season, salary paid by Arsenal. Arteta’s call key to convince the player. Medicals pending - then deal will be announced.
                            <br/>
                            <br/>
                            Salary paid by #AFC, £2.5m loan fee as per Times.
                            <br/>
                            <br/>
                            <b>Source:</b> @FabrizioRomano
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Jan 24, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
