import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import medley from '../../..//assets/medley.jpg';

export default class Transfer6 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={medley} alt="Medley leaves!" />
                        <Card.Body>
                            <Card.Title>Medley leaves!</Card.Title>
                            <Card.Text>
                            Arsenal defender Zech Medley will join Belgian side K.V. Oostende on a permanent transfer.
                            <br/>
                            <br/>
                            Reports suggest that Arsenal have inserted a sell-on clause into the deal.
                            <br/>
                            <br/>
                            <b>Source:</b> Chris Wheatley
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 18, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
