import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/News20.jpg';

export default class News20 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={img} alt="Luiz to leave Arsenal"/>
                        <Card.Body>
                            <Card.Title>Luiz to leave Arsenal!</Card.Title>
                            <Card.Text>
                            An amicable meeting between Luiz and Arsenal took place on Friday, where it was decided that he would leave when his contract expires in July.
                            <br/>
                            <br/>
                            The 34-year-old Brazil international has been with the London club for the last two seasons, having signed from Chelsea in the summer of 2019.
                            <br/>
                            <br/>
                            Luiz won the FA Cup last season with Arsenal, starting in the final, as they beat his old club Chelsea 2-1 at Wembley.
                            <br/>
                            <br/>
                            Arsenal added the Community Shield at the start of this season with Luiz starting again as they beat Liverpool on penalties.
                            <br/>
                            <br/>
                            <b>Source:</b> Sky Sports
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">May 14, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
