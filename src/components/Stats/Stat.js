import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Stat01 from './Stat1'
import Stat02 from './Stat2'

export default class News extends Component {
    render() {
        return (
            <div className="stats">
                <h3>Stats of the Week! 💡</h3>
                <Carousel>
                <Carousel.Item>
                    <Stat01/>
                </Carousel.Item>
                <Carousel.Item>
                    <Stat02/>
                </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
