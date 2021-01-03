import React, { Component } from 'react'
import { Row, Card, CardColumns } from 'react-bootstrap'
import Emi from '/the-gooners-world/src/assets/emi-sold.jpg';
import { FaHeart } from 'react-icons/fa';

export default class Transfer8 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={Emi} />
                        <Card.Body>
                            <Card.Title>Thank your Emi! <FaHeart /></Card.Title>
                            <Card.Text>
                            Arsenal goalkeeper Emi Martinez has completed his move to Aston Villa.
                            <br/>
                            <br/>
                            Emi posted a goodbye video on his Instagram thanking the Arsenal fans for their love over his 11 years at the Club. After his heroics at the end of the 2019/2020 season, the Argentine is leaving Arsenal as a FA CUP and a Community Shield winner. 
                            <br/>
                            <br/>
                            Martinez has signed a 4 year deal with Villa after passing his medical on Saturday as reported earlier.
                            <br/>
                            <br/>
                            <b>Source:</b> Emi Martinez Instagram
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Sept 15, 2020</Card.Footer>
                        </Card>
            </div>
        )
    }
}
