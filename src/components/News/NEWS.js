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
import News14 from './News14';
import News15 from './News15';

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
                        <News15 />
                        <News14 />
                        <News9 />
                    </CardColumns>
                </Row>
                <Button variant="danger" onClick={this.handlemore} style={{display: this.state.morebtn}}>More News ⬇</Button>
                <Row style={{display: this.state.display}}>
                    <CardColumns>
                        <News8 />
                        <News7 />
                        <News3 />
                    </CardColumns>
                </Row>
                <Row style={{display: this.state.display}}>
                    <CardColumns>
                        <News2 />
                        <News1 />
                        <News13 />
                    </CardColumns>
                </Row>
                <Row style={{display: this.state.display}}>
                    <CardColumns>
                        <News12 />
                        <News11 />
                    </CardColumns>
                </Row>
                <Button variant="danger" onClick={this.handleless} style={{display: this.state.lessbtn}}>Less News ⬆</Button>
            </div>
        )
    }
}
