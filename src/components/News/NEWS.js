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
import News16 from './News16';
import News17 from './News17';
import News18 from './News18';
import News19 from './News19';
import News20 from './News20';

export default function News(props) {
    const [display, setDisplay] = React.useState('none');
    const [morebtn, setMorebtn] = React.useState('block');
    const [lessbtn, setLessbtn] = React.useState('none');

    const handlemore = () => {
        setDisplay('block');
        setMorebtn('none');
        setLessbtn('block');
    }
    const handleless = () => {
        setDisplay('none');
        setMorebtn('block');
        setLessbtn('none');
    }
    
    React.useEffect(()=>{
        props.origin == "center" ? setDisplay('block') : setDisplay('none')
    })
        return (
            <div className="news">
                <h3>Latest News 🗞️</h3>
                <Row>
                    <CardColumns>
                        <News20 />
                        <News19 />
                        <News18 />
                    </CardColumns>
                </Row>
                {props.origin != "center" && <Button variant="danger" onClick={handlemore} style={{display: morebtn}}>More News ⬇</Button>} 
                <Row style={{display: display}}>
                    <CardColumns>
                        <News17 />
                        <News16 />
                        <News15 />
                    </CardColumns>
                </Row>
                <Row style={{display: display}}>
                    <CardColumns>
                        <News14 />
                        <News9 />
                        <News8 />
                    </CardColumns>
                </Row>
                <Row style={{display: display}}>
                    <CardColumns>
                        <News7 />
                        <News3 />
                        <News2 />
                    </CardColumns>
                </Row>
                <Row style={{display: display}}>
                    <CardColumns>
                        <News1 />
                        <News13 />
                        <News12 />
                        <News11 />
                    </CardColumns>
                </Row>
                {props.origin != "center" && <Button variant="danger" onClick={handleless} style={{display: lessbtn}}>Less News ⬆</Button>}
            </div>
        )
}
