import React from 'react'
import { Card } from 'react-bootstrap'

export default function NewsBoilerPlate (props){
        return (
            <div>
                <Card>
                    <Card.Img variant="top" src={props.img} alt={props.alt}/>
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text>
                            {props.report}
                            <br/>
                            <br/>
                            <b>Source:</b> {props.source}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">{props.date}</Card.Footer>
                </Card>
            </div>
        )
}
