import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import RH from '/the-gooners-world/src/assets/RH.jpg';

export default class News9 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={RH} />
                        <Card.Body>
                            <Card.Title>Rob Holding to commit his future to The Gunners! <span role="img" aria-label="soon icon">🔜</span></Card.Title>
                            <Card.Text>
                            Rob Holding is close to agreeing a new long-term contract at Arsenal.
                            <br/>
                            <br/>
                            After his performances in the wake of a number of defensive injuries at Arsenal, Arteta has been won around by the 25-year-old.
                            <br/>
                            <br/>
                            His current deal is set to expire in June 2023.
                            <br/>
                            <br/>
                            Rob has started nine of Arsenal's last ten in the Premier League with back-to-back clean sheets over this week.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Jan 02, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
