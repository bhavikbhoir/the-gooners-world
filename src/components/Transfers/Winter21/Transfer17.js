import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import mesut from '../../..//assets/ByeMesut.jpg';

export default class Transfer17 extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Card.Img variant="top" src={mesut} alt="Mesut Özil joins Fenerbahce" />
                        <Card.Body>
                            <Card.Title>Mesut Özil joins Fenerbahce <span role="img" aria-label="heartbreak icon">💔</span></Card.Title>
                            <Card.Text>
                            Mesut Ozil has joined Turkish Super Lig side Fenerbahce in a permanent transfer.
                            <br/>
                            <br/>
                            Mesut became our record signing when he joined us at the end of the 2013 transfer window from Real Madrid.
                            <br/>
                            <br/>
                            He was soon to make an impact, claiming his first assist on his debut and ended his first season with the dramatic FA Cup final win over Hull City.
                            <br/>
                            <br/>
                            Two more FA Cups followed in the next three seasons and Mesut was also named Arsenal Player of the Season in 2015/16.
                            <br/>
                            <br/>
                            We wish Mesut the best in Turkey!
                            <br/>
                            <br/>
                            <b>Source:</b> Arsenal.com
                            {/* <br/>
                            <br/>
                            There were no issues from players returning from international matches.</Card.Text> */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Jan 24, 2021</Card.Footer>
                        </Card>
            </div>
        )
    }
}
