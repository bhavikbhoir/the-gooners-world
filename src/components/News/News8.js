import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import KT from '/the-gooners-world/src/assets/kt.jpg';

export default class News8 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={KT} />
                        <Card.Body>
                            <Card.Title>Kieran Tierney is Okay!</Card.Title>
                            <Card.Text>
                            Mikel Arteta has reassured fans over the fitness of full-back Kieran Tierney.
                            <br/>
                            <br/>
                            Arsenal Defender was named on the team sheet against West Ham but he was withdrawn late on and replaced by Sead Kolasinac after feeling an issue in the warm-up.
                            <br/>
                            <br/>
                            Arteta on KT - "Kieran is fine. He had a little muscular discomfort in the last few days.
                            <br/>
                            <br/>
                            "We believed that he was going to be fit but during the warm-up, in the last ten minutes, he said he wasn't feeling OK.
                            <br/>
                            <br/>
                            "We had to make a decision. We were prepared just in case and Kola came on and had a good game."
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 20, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
