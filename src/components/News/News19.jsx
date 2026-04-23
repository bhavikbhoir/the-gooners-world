import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '/the-gooners-world/src/assets/News19.jpg';

export default class News19 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={img} alt="Lacazette back for the semis"/>
                        <Card.Body>
                            <Card.Title>Back in time for the Semis!</Card.Title>
                            <Card.Text>
                            Mikel Arteta had some good news ahead of our Europa League semi-final first leg against Villarreal.
                            <br/>
                            <br/>
                            Aubameyang, Laca and Kieran are all in contention for the game.
                            <br/>
                            <br/>
                            It was initially feared that Kieran's injury was bad and needed surgery but that wasn't the case.
                            Mikel said: "He didn't need the surgery that we were afraid of at the beginning and then he's been working like a beast every single day. 
                            I don't know if he's going to make it tomorrow but he certainly wants to be as close as possible to that football pitch to give himself 
                            the best possible chance."
                            <br/>
                            <br/>
                            A big game awaits us on Thursday and all our big guns are back just in time.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">April 28, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
