import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Auba from '/the-gooners-world/src/assets/auba-pfa.jpg';

export default class News11 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Auba}/>
                        <Card.Body>
                            <Card.Title>Auba named in the PFA team of the year! <span role="img" aria-label="trophy icon">🏆</span></Card.Title>
                            <Card.Text>
                            Arsenal Captain Aubameyang named in the PFA Premier League Team of the Year 2019/2020.
                            <br/>
                            <br/>
                            In the Premier League season 2019/20, Pierre-Emerick Aubameyang played 35 matches (plus 1 as a sub). 
                            <br/>
                            <br/>
                            He had 42 shots on target from a total of 70 shots and scored 22 goals (16.17 xG). 
                            <br/>
                            <br/>
                            Pierre-Emerick Aubameyang averaged 24 passes per match with a pass completion rate of 73%, and had 3 assists.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 8, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
