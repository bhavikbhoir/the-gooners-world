import React from 'react'
import { Row, CardColumns, Button } from 'react-bootstrap'
import News20 from './News20';
import News21 from './News21';
import News22 from './News22';
import News23 from './News23';
import News24 from './News24';
import News25 from './News25';
import News26 from './News26';
import News27 from './News27';

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

        return (
            <div className="news">
                <h3>Latest News <span role="img" aria-label="news icon"> 🗞️</span></h3>
                <Row>
                    <CardColumns>
                        <News27 />
                        <News26 />
                        <News25 />
                    </CardColumns>
                </Row>
                {props.origin !== "center" && <Button variant="danger" onClick={handlemore} style={{display: morebtn}}>More News ⬇</Button>} 
                <Row style={{display: props.origin !== "center" ? display : "block"}}>
                    <CardColumns>
                        <News24 />
                        <News23 />
                        <News22 />
                    </CardColumns>
                </Row>
                <Row style={{display: props.origin !== "center" ? display : "block"}}>
                    <CardColumns>
                        <News21 />
                        <News20 />
                    </CardColumns>
                </Row>
                {props.origin !== "center" && <Button variant="danger" onClick={handleless} style={{display: lessbtn}}>Less News ⬆</Button>}
            </div>
        )
}
