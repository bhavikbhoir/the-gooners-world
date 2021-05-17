import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Brandt from '/the-gooners-world/src/assets/brandt.jpg';

export default class Transfer11 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Brandt} />
                        <Card.Body>
                            <Card.Title>Zorc rubishes Julian Brandt-Arsenal rumours! <span role="img" aria-label="dortmund icon">🟡⚫️</span></Card.Title>
                            <Card.Text>
                            Borussia Dortmund sport director Zorc about Julian Brandt-Arsenal rumours: “No one has contacted us. There is nothing on the table at the moment from Arsenal“.
                            <br/>
                            <br/>
                            No negotiations or talks opened to sign him in January, at the moment. 
                            <br/>
                            <br/>
                            <b>Source:</b> @FabrizioRomano
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
