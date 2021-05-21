import React, { Component } from 'react'
import { Row, Col  } from 'react-bootstrap'
import Fixtures from './Fixtures';
import Fixtures11 from './FixturesList/Fixtures11';
import Fixtures12 from './FixturesList/Fixtures12';
import Fixtures13 from './FixturesList/Fixtures13';

export default class Center extends Component {
    btnClick() {
        window.open("https://youtu.be/aSDmh_qGLpk");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    render() {
        return (
            <div className="fixtures">
                <Fixtures/>
                
                <h3>League Table</h3>
                <Row id="large-table">
                    <Col md={12} id="pl-table">
                    <iframe title="large-table" frameborder="0"  scrolling="no" width="1140" height="700" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=&timezone=America/Chicago&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=1&width=1140&height=700&font=Verdana&fs=14&lh=28&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=dc3545&hfc=FFFFFF"></iframe>
                    </Col>
                </Row>

                <Row id="mid-table">
                    <Col md={12} id="pl-table">
                    <iframe title="mid-table" frameborder="0"  scrolling="no" width="960" height="700" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=&timezone=America/Chicago&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=1&width=960&height=700&font=Verdana&fs=14&lh=28&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=dc3545&hfc=FFFFFF"></iframe>
                    </Col>
                </Row>

                <Row id="ipad-table">
                    <Col md={12} id="pl-table">
                    <iframe title="ipad-table" frameborder="0"  scrolling="no" width="720" height="700" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=&timezone=America/Chicago&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=1&width=720&height=700&font=Verdana&fs=14&lh=28&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=dc3545&hfc=FFFFFF"></iframe>
                    </Col>
                </Row>

                <Row id="small-table">
                    <Col md={12} id="pl-table">
                    <iframe title="small-table" frameborder="0"  scrolling="no" width="350" height="550" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&stage=&team=&timezone=Pacific/Midway&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=0&width=350&height=550&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=dc3545&hfc=FFFFFF"></iframe>
                    </Col>
                </Row>

                <h3>Previous Games</h3>
                <Fixtures13 />
                <Fixtures12 />
                <Fixtures11 />
            </div>
        )
    }
}
