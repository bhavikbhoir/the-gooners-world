import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import sokratis from '../../..//assets/sokratis.jpg';

export default class Transfer18 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={sokratis} alt="Sokratis joins Olympiacos" />
                        <Card.Body>
                            <Card.Title>Sokratis joins Olympiacos</Card.Title>
                            <Card.Text>
                            The Greek Defender joins Olympiacos after been released by Arsenal earlier this week.
                            <br/>
                            <br/>
                            The 32-year-old made his first appearance since the FA Cup final win over Chelsea last June in the EFL Trophy in December, and played a couple of games for Arsenal under 23s towards the end of last year.
                            <br/>
                            <br/>
                            He leaves with 69 appearances under his belt and an FA Cup winner's medal.
                            <br/>
                            <br/>
                            We wish Papa the best at Olympiacos.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Jan 25, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
