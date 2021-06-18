import React, { Component } from 'react'
import img from '../../assets/HBARS.jpg';
import NewsBoilerPlate from './News_BoilerPlate';

export default class News22 extends Component {
    render() {
        return (
            <NewsBoilerPlate 
                img={img}
                alt="Hibernian vs Arsenal"
                title={
                    <p>Hibernian <span role="img" aria-label="handshake icon">🤝</span> Arsenal!</p>
                }
                report={
                    <p>
                    Scottish Cup finalists Hibernian FC announces pre-season friendly with the Gunners!
                    <br/>
                    <br/>
                    The match will take place on 13 July at Easter Road. The match will kick off at 6pm (UK Time).
                    <br/>
                    <br/>
                    Mikel Arteta said: “We’re pleased to confirm our second game in Scotland as part of a week-long training camp that will help us prepare for the 2021/22 season."
                    </p>
                }
                source="Hibernian Football Club"
                date="May 18, 2021"
            />
        )
    }
}
