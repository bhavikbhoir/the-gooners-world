import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import { FaNewspaper, FaHeart, FaSmile } from 'react-icons/fa'
import Jule from '/Users/bhvkb/the-gooners-world/src/assets/jule.jpg';

export default class Transfer3 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Jule}/>
                        <Card.Body>
                            <Card.Title>Tyreece John-Jules joins Doncaster Rovers on loan!</Card.Title>
                            <Card.Text>
                            Tyreece John-Jules has joined League One side Doncaster Rovers on loan for the 2020/21 season.
                            <br />
                            <br />
                            The 19 year-old forward, who has been part of our youth set-up since he was eight, enjoyed another successful year in his development last season, scoring eight goals from his 13 appearances for us in the Premier League 2 and EFL Trophy, as well as spending a loan spell with League One side Lincoln City.<br />
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 8, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
