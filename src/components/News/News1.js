import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Auba from '/the-gooners-world/src/assets/auba.jpg';

export default class News1 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Auba}/>
                        <Card.Body>
                            <Card.Title>Aubameyang set to sign new Arsenal deal!<span role="img" aria-label="contract icon"> 📝</span></Card.Title>
                            <Card.Text>
                            Pierre-Emerick Aubameyang to end speculation over Arsenal future by signing new 3yr contract, which will enable him to become best-paid #AFC player. Arteta intervention key & relations with 31yo + father fundamental to getting deal over line.
                            <br />
                            <br />
                            <b>Source:</b> David Ornstein
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 10, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
