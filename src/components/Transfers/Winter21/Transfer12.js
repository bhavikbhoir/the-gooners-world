import React, { Component } from 'react'
import { Row, Card } from 'react-bootstrap'
import isco from '/the-gooners-world/src/assets/isco.jpg';

export default class Transfer12 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={isco} />
                        <Card.Body>
                            <Card.Title>Isco to Arsenal?</Card.Title>
                            <Card.Text>
                            Arsenal want to sign Isco from Real Madrid on loan for the rest of the season. 
                            <br/>
                            <br/>
                            The Spaniard is out of favour currently under Zidan at Madrid. but, Arsenal could benefit from this deal given Arsenal's lack of creativity in the midfield. 
                            <br/>
                            <br/>
                            However, The current performances from Emile Smith Rowe in the Number 10 position have been impressive and might put an end to this deal.
                            <br/>
                            <br/>
                            <b>Source:</b> Various
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Jan 02, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
