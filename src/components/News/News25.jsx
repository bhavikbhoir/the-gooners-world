import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/flcup.jpg';

export default class News25 extends Component {
    render() {
        return (
            <div className="top-news">
                <Card>
                        <Card.Img variant="top" src={img} alt="Arsenal cancel US Tour!"/>
                        <Card.Body>
                            <Card.Title>Arsenal cancel US Tour!</Card.Title>
                            <Card.Text>
                            Following a small number of positive COVID tests among the planned party to travel to America tomorrow, Arsenal have been forced to withdraw from the Florida Cup.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal Official
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 25, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
