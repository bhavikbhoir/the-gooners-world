import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/joe.jpg';

export default class News27 extends Component {
    render() {
        return (
            <div className="top-news">
                <Card>
                        <Card.Img variant="top" src={img} alt="Joe leaves for Newcastle!"/>
                        <Card.Body>
                            <Card.Title>Joe leaves for Newcastle!</Card.Title>
                            <Card.Text>
                            Newcastle have agreed a fee with Arsenal to sign Joe Willock on a permanent basis. Personal terms still need to be finalised so deal not yet done. 
                            <br/>
                            <br/>
                            Price would be in excess of £20m for the 21y England youth midfielder.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal Official
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Aug 13, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
