import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import LT from '/the-gooners-world/src/assets/lt.jpg';

export default class Transfer9 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={LT} alt="Torreira to Atletico Madrid?" />
                        <Card.Body>
                            <Card.Title>Torreira to Atletico Madrid?</Card.Title>
                            <Card.Text>
                            According to a source very close to the player told ESPN Uruguay, the negotiations for Torreira to play for Aleti are well advanced but not yet closed. 
                            <br/>
                            <br/>
                            Talks of a swap + money deal for Thomas Partey is also on the cards after the Atletico boss Diego Simeone has expressed interest in the Arsenal midfielder.
                            <br/>
                            <br/>
                            This might just be a win - win deal for both parties with Arteta getting his top target of the window and Atletico getting a good replacement for Partey.
                            <br/>
                            <br/>
                            <b>Source:</b> ESPN Uruguay and Sky Sports News
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 20, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
