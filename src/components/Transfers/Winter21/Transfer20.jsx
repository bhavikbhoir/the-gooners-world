import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import musti from '../../..//assets/musti.jpg';

export default class Transfer20 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={musti} alt="A busy Deadline day." />
                        <Card.Body>
                            <Card.Title>A busy Deadline day.</Card.Title>
                            <Card.Text>
                            Three Arsenal players departed the club on the Deadline Day of the Winter transfer window.
                            <br/>
                            <br/>
                            Arsenal decided to terminate Shkrodran Mustafi's contract on which the German Defender joined Bundesliga side FC Schalke 04.
                            <br/>
                            <br/>
                            Ainsley Maitland Niles joined West Bromwich Albion on loan until the end of the season. The English International had fallen out of favor at Arsenal, and a loan deal is something that would really help him find his form and fulfil his potential.
                            <br/>
                            <br/>
                            The Hale End graduate, Joe Willock joined Newcastle United on loan until the end of the season.
                            <br/>
                            <br/>
                            We wish all three the best at their new clubs.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Feb 01, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
