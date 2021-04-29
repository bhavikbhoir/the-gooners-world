import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import img from '/the-gooners-world/src/assets/News17.jpg';

export default class News17 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={img}/>
                        <Card.Body>
                            <Card.Title>Balogun Signs! 📝</Card.Title>
                            <Card.Text>
                            Folarin Balogun has committed his future to us by signing a new long-term contract with the club. 
                            <br/>
                            <br/>
                            The 19-year-old striker, who signed as a scholar in July 2017 having been at the club since he was nine years old, has continued his impressive development this season, making his first-team debut and scoring his first goals at senior level.
                            <br/>
                            <br/>
                            Mikel Arteta said: “We have been extremely impressed with Flo this season. He has continually shown his natural ability in many training sessions with us and we have been equally impressed with his early integration into the first-team squad on matchdays. 
                            <br/>
                            <br/>
                            We would like to congratulate Flo on his new contract and we look forward to his continued development.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">April 26, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
