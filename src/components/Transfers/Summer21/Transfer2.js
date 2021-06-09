import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import xhaka from '/the-gooners-world/src/assets/xhaka.jpg';

export default class Transfer2 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={xhaka} alt="Neves in Xhaka out?" />
                        <Card.Body>
                            <Card.Title>Neves in Xhaka out?</Card.Title>
                            <Card.Text>
                            @TheAthleticUK reports that contact has been made between Arsenal and Wolves about the possibility of signing Ruben Neves. 
                            <br/>
                            <br/>
                            While the rumours emerged of a deal been finalized with Roma for the former Gunners Captain Granit Xhaka as reported by @ChrisWheatley_,
                            it looks to be straight swap in the CM position for the Gunners.
                            <br/>
                            <br/>
                            <b>Source:</b> Various
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 07, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
