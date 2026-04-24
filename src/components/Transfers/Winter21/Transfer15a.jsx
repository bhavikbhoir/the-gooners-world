import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import ryan from '../../..//assets/ryan.jpg';

export default class Transfer15a extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={ryan} alt="Mat Ryan signs for Arsenal" />
                        <Card.Body>
                            <Card.Title>Mat Ryan signs for Arsenal</Card.Title>
                            <Card.Text>
                            The 28-year-old Goalkeeper has joined us on a loan deal until the end of the season.
                            <br/>
                            <br/>
                            Mikel Arteta said: “We know Mat very well through his performances with Brighton in recent seasons and he brings additional quality to our squad. 
                            We welcome Mat to Arsenal and look forward to working with him this season.”  
                            <br/>
                            <br/>
                            Alex will wear the number 33 shirt at Arsenal.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Jan 22, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
