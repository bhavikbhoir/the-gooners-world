import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Stat01 from './Stat1'
// import Stat02 from './Stat2'
import Stat03 from './Stat3'
import Stat04 from './Stat4'
import Stat05 from './Stat5'
import Stat06 from './Stat6'
import Stat07 from './Stat7'

export default class News extends Component {
    render() {
        return (
            <div className="stats">
                <h3>Stats of the Season! <span role="img" aria-label="stats icon"> 💡</span></h3>
                <Carousel>
                <Carousel.Item>
                    <Stat07/>
                </Carousel.Item>
                <Carousel.Item>
                    <Stat06/>
                </Carousel.Item>
                <Carousel.Item>
                    <Stat05/>
                </Carousel.Item>
                <Carousel.Item>
                    <Stat04/>
                </Carousel.Item>
                <Carousel.Item>
                    <Stat03/>
                </Carousel.Item>
                <Carousel.Item>
                    <Stat01/>
                </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
