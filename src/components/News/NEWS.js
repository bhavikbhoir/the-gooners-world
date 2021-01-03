import React, { Component } from 'react'
import { Row, Card, CardColumns, Button } from 'react-bootstrap'
import News1 from './News1';
import News2 from './News2';
import News3 from './News3';
import News11 from './News11';
import News12 from './News12';
import News13 from './News13';
import News7 from './News7';
import News8 from './News8';
import News9 from './News9';

export default class News extends Component {

    constructor () {
        super();
        this.state = {
            display: 'none',
            morebtn: 'block',
            lessbtn: 'none'
    }
}

    handlemore = () => {
        this.setState({display: 'block'});
        this.setState({morebtn: 'none'})
        this.setState({lessbtn: 'block'})
    }
    handleless = () => {
        this.setState({display: 'none'});
        this.setState({morebtn: 'block'});
        this.setState({lessbtn: 'none'})
    }

    render() {
        return (
            <div className="news">
                <h3>Latest News 🗞️</h3>
                <Row>
                    <CardColumns>
                        <News9 />
                        <News8 />
                        <News7 />
                    </CardColumns>
                </Row>
                <Button variant="danger" onClick={this.handlemore} style={{display: this.state.morebtn}}>More News ⬇</Button>
                <Row style={{display: this.state.display}}>
                    <CardColumns>
                        <News3 />
                        <News2 />
                        <News1 />
                    </CardColumns>
                </Row>
                <Row style={{display: this.state.display}}>
                    <CardColumns>
                        <News13 />
                        <News12 />
                        <News11 />
                    </CardColumns>
                </Row>
                <Button variant="danger" onClick={this.handleless} style={{display: this.state.lessbtn}}>Less News ⬆</Button>
            </div>
        )
    }
}
