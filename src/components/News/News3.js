import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Mikel from '/the-gooners-world/src/assets/mikel.jpg';

export default class News3 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Mikel} />
                        <Card.Body>
                            <Card.Title>Mikel - The Manager!<span role="img" aria-label="manager icon"> 👔</span></Card.Title>
                            <Card.Text>
                            Mikel Arteta's job title has changed from head coach to first-team manager.
                            <br/>
                            <br/>
                            "Going forward Mikel will join a really strong team with Edu and they'll be working really, really closely together to manage all the other elements of our football operations that are so important, whether that is analysis, recruitment, high performance or medical, they'll be looking after those areas together." 
                            <br/>
                            <br/>
                            <i>- Chief executive Vinai Venkatesham</i> 
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 10, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
