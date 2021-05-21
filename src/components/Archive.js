import React, { Component } from 'react'
import Trending2 from '../components/Archives/Trending/Trending2'
import Trending1 from '../components/Archives/Trending/Trending1'
import Breaking2 from '../components/Archives/Breaking/Breaking2'
import Breaking1 from '../components/Archives/Breaking/Breaking1'
import Trending3 from './Archives/Trending/Trending3'
import Trending4 from './Archives/Trending/Trending4'
import Trending5 from './Archives/Trending/Trending5'

export default class Archive extends Component {
    render() {
        return (
            <div className="archive">
                <Trending5 />
                <Trending4 />
                <Trending3 />
                <Trending2 />
                <Breaking2 />
                <Breaking1 />
                <Trending1 />
            </div>
        )
    }
}
