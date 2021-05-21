import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import mesut from '/the-gooners-world/src/assets/mesut.jpg';

export default class Transfer13 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={mesut} alt="End of the road for Mesut?" />
                        <Card.Body>
                            <Card.Title>End of the road for Mesut? <span role="img" aria-label="heartbreak icon">💔</span></Card.Title>
                            <Card.Text>
                            It looks like Mesut Özil's Arsenal career is going to meet a sad ending!
                            <br/>
                            <br/>
                            As per initial reports, Mesut was in negotiations with MLS team DC United before finalzing on his move to the Turkish club Fenerbahce.
                            <br/>
                            <br/>
                            Rumours suggest that it will be a 6 month loan deal with a free summer transfer to be finalized later.
                            <br/>
                            <br/>
                            Since Mikel is adamant at brining back Özil into the team as per the latest press conference ahead of the FA Cup tie, this move seems to be the best option for both parties.
                            <br/>
                            <br/>
                            <b>Source:</b> Various
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
