import React, { Component, useState } from 'react'
import { Row, CardColumns, Button } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Transfer6 from './Summer20/Transfer6';
import Transfer5 from './Summer20/Transfer5';
import Transfer4 from './Summer20/Transfer4';
import Transfer3 from './Summer20/Transfer3';
import Transfer2 from './Summer20/Transfer2';
import Transfer1 from './Summer20/Transfer1';
import Transfer7 from './Summer20/Transfer7';
import Transfer8 from './Summer20/Transfer8';
import Transfer9 from './Summer20/Transfer9';
import Transfer10 from './Winter21/Transfer10';
import Transfer11 from './Winter21/Transfer11';
import Transfer12 from './Winter21/Transfer12';
import Transfer13 from './Winter21/Transfer13';
import Transfer14 from './Winter21/Transfer14';
import Transfer15 from './Winter21/Transfer15';
import Transfer16 from './Winter21/Transfer16';
import Transfer17 from './Winter21/Transfer17';
import Transfer15a from './Winter21/Transfer15a';
import Transfer19 from './Winter21/Transfer19';
import Transfer20 from './Winter21/Transfer20';
import Transfer21 from './Summer21/Transfer1';
import Transfer22 from './Summer21/Transfer2';

function ControlledTabs() {

const [key, setKey] = useState('Summer21');
const [display, setDisplay] = useState('none')
const [morebtn, setMoreBtn] = useState('block')
const [lessbtn, setLessBtn] = useState('none')

const handlemore = () => {
    setDisplay('block')
    setMoreBtn('none')
    setLessBtn('block')
}
const handleless = () => {
    setDisplay('none')
    setMoreBtn('block')
    setLessBtn('none')
}

    return (
        <Tabs
            id="transfer-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="Summer21" title="Summer Updates ☀️">
                <Row>
                    <CardColumns>
                        <Transfer22 />
                        <Transfer21 />
                    </CardColumns>
                </Row>
            </Tab>
            <Tab eventKey="winter" title="Winter Updates ❄️">
                <Row>
                    <CardColumns>
                        <Transfer20 />
                        <Transfer19 />
                        <Transfer17 />
                    </CardColumns>
                </Row>
                <Button variant="danger" onClick={handlemore} style={{display: morebtn}}>More News ⬇</Button>
                <Row style={{display: display}}>
                    <CardColumns>
                        <Transfer16 />
                        <Transfer15a />
                        <Transfer15 />
                    </CardColumns>
                </Row>
                <Row style={{display: display}}>
                    <CardColumns>
                        <Transfer14 />
                        <Transfer13 />
                        <Transfer12 />
                    </CardColumns>
                </Row>
                <Row style={{display: display}}>
                    <CardColumns>
                        <Transfer11 />
                        <Transfer10 />
                    </CardColumns>
                </Row>
                <Button variant="danger" onClick={handleless} style={{display: lessbtn}}>Less News ⬆</Button>
                </Tab>
            <Tab eventKey="Summer" title="From the Archives ⏮">
                <Row>
                    <CardColumns>
                        <Transfer9 />
                        <Transfer8 />
                        <Transfer7 />
                    </CardColumns>
                </Row>
                <Button variant="danger" onClick={handlemore} style={{display: morebtn}}>More News ⬇</Button>
                <Row style={{display: display}}>
                    <CardColumns>
                        <Transfer6 />
                        <Transfer5 />
                        <Transfer4 />
                    </CardColumns>
                </Row>
                <Row style={{display: display}}>
                    <CardColumns>
                        <Transfer3 />
                        <Transfer2 />
                        <Transfer1 />
                    </CardColumns>
                </Row>
                <Button variant="danger" onClick={handleless} style={{display: lessbtn}}>Less News ⬆</Button>
            </Tab>
        </Tabs>
    );
}

export default class Transfers extends Component {
    render() {
        return (
            <div className="transfers">
                <h3>Latest Transfer updates<span role="img" aria-label="transfer updates icon"> 🔁</span></h3>
                <h5>The Summer Transfer Window is now Open!<span role="img" aria-label="window open icon"> 👀</span></h5>
                <ControlledTabs/>
            </div>
        )
    }
}
