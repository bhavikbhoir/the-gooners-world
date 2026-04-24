import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/ktsigns.jpg';

export default class News24 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={img} alt="More of KT!"/>
                        <Card.Body>
                            <Card.Title>More of KT!</Card.Title>
                            <Card.Text>
                            Kieran Tierney has signed a new 5-year contract at Arsenal. 
                            <br/>
                            <br/>
                            Since joining us from Celtic in the summer of 2019, the Scotland international has impressed with his consistently high-quality performances, making 62 appearances and becoming an integral part of the team.
                            <br/>
                            <br/>
                            The 24-year-old defender has established himself as a Premier League regular and played a huge role in lifting the Emirates FA Cup in his first season with us, setting up the winning goal in the semi-final, before again starring at Wembley in the final win over Chelsea.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal Official
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">June 25, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
