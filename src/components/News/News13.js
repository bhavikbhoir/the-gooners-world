import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Luiz from '/the-gooners-world/src/assets/luiz.jpg';

export default class News11 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Luiz} alt="Luiz injured."/>
                        <Card.Body>
                            <Card.Title>David Luiz Injured!? <span role="img" aria-label="injury icon">🤕</span></Card.Title>
                            <Card.Text>
                            Arsenal Defender David Luiz a doubt for Arsenal's season opener this weekend  with neck injury that could rule him out for an extended period. Depends how responds to treatment but very delicate + likely to be a late decision on Brazilian centre-back.
                            <br/>
                            <br/>
                            <b>Source:</b> David Ornstein
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 9, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
