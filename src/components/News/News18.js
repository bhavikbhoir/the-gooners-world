import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import LFA from '/the-gooners-world/src/assets/LFA.jpg';

export default class News18 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={LFA}/>
                        <Card.Body>
                            <Card.Title>Bukayo Saka named LFA Young Player of the Year 2021! 🌶</Card.Title>
                            <Card.Text>
                            Our Starboy was named the young player of the year 2021 at the London Football Association Awards.
                            <br/>
                            <br/>
                            The Awards recognise the best of London football from the following clubs: AFC Wimbledon, Arsenal, Brentford, Charlton Athletic, Chelsea, Crystal Palace, Fulham, Leyton Orient, Millwall, QPR, Tottenham, Watford and West Ham.
                            <br/>
                            <br/>
                            Saka won the award ahead of fellow Gunner Emile Smith Rowe and other young stars such as Mason Mount (Chelsea), Declan Rice (West Ham) and Reece James (Chelsea).
                            <br/>
                            <br/>
                            We congratulate Bukayo on this achievement and wish him more success.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">April 27, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
