import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import adams from '../../..//assets/adams.jpg';

export default class Transfer3 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={adams} alt="Arsenal keen on Adams!" />
                        <Card.Body>
                            <Card.Title>Arsenal keen on Adams!</Card.Title>
                            <Card.Text>
                            At right-back, #AFC are keen on RB Leipzig’s 22-year-old US international Tyler Adams. One of the appealing factors about Adams is he can play both as a right-back and central midfielder, which makes him a good fit for Arteta’s inverted system on that flank. 
                            <br/>
                            <br/>
                            <b>Source:</b> @TheAthleticUK
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 10, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
