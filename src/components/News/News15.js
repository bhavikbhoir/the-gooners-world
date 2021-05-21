import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import LuizNews from '/the-gooners-world/src/assets/LuizNews.jpg';

export default class News15 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={LuizNews} alt="Luiz & Tierney Injury update."/>
                        <Card.Body>
                            <Card.Title>Update on Luiz & Tierney.</Card.Title>
                            <Card.Text>
                            David Luiz underwent a small procedure on his right knee on Sunday morning.
                            <br/>
                            <br/>
                            The procedure has been a success and David is now back at home rehabilitating. He will be able to return to daily support and recovery with our medical team at the training centre in the coming days.
                            <br/>
                            <br/>
                            David is expected to be back to full fitness and available for selection in the upcoming weeks.
                            <br/>
                            <br/>
                            Tierney was taken off in our last game against Liverpool.
                             Here's what Mikel Arteta said in the press conference: He felt something in his knee. He was in pain so it looks like he will be injured but we don't know how long for.
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">April 04, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
