import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { FaHeart } from 'react-icons/fa'
import Kit from '/the-gooners-world/src/assets/third-kit.jpg';

export default class News2 extends Component {
    render() {
        return (
            <div>
                <Card id="kit">
                        <Card.Img variant="top" src={Kit} alt="Arsenal drop their third kit!" />
                        <Card.Body>
                            <Card.Title>Arsenal drop their third kit! <FaHeart /></Card.Title>
                            <Card.Text>
                            {/* This is Family.
                            <br/>
                            Introducing the new 2020/21 Third jersey. */}
                            {/* <br/>
                            <br/> */}
                            The new strip will be worn on the pitch for the first time when we kick off the Premier League season against Fulham on Saturday.
                            <br/>
                            {/* The new shirt colours are intended to represent the lights and atmosphere that illuminate Emirates Stadium during a night match. The shirt pattern was created from a custom set of tie dye prints.  */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 10, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
