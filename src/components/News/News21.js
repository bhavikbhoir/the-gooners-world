import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import img from '../../assets/News21.jpg';

export default class News21 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={img} alt="Willian rumored to leave in Summer"/>
                        <Card.Body>
                            <Card.Title>Willian rumored to leave in Summer!</Card.Title>
                            <Card.Text>
                            After David Luiz, fellow Brazilian Willian is expected to leave Arsenal this summer.
                            <br/>
                            <br/>
                            There’s interest from European clubs and from MLS - Inter Miami wanted him last summer. Arsenal are waiting for official bids.
                            <br/>
                            <br/>
                            <b>Source:</b> @FabrizioRomano
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">May 16, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
