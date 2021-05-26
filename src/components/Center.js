import React, { Component } from 'react'
import { Row, Col  } from 'react-bootstrap'
import Fixtures from './Fixtures';
import Fixtures12 from './FixturesList/Fixtures12';
import Fixtures13 from './FixturesList/Fixtures13';
import Fixtures14 from './FixturesList/Fixtures14';

export default class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {
          status: []
        };
    }
    btnClick() {
        window.open("https://youtu.be/aSDmh_qGLpk");
    }
    detailsbtnClick() {
        window.open("https://www.fctables.com/teams/arsenal-180231/");
    }
    componentDidMount() {
        this.setState({status:["-","-","C", "CL", "CL", "CL", "EL", "EL", "ECL",
                    "-","-","-","-","-","-","-","-","-","-","R","R","R"]})
        document.getElementById("match-center").classList.add("active")
    }
    render() {
        return (
            <div className="fixtures m-0">
                <Fixtures/>
                
                <div className="mr-3 ml-3">
                <h3>League Table</h3>
                <Row id="large-table">
                    <Col md={1} className="status">
                    {this.state.status.map((data, index) => {
                        return (
                        <tr key={index}>
                            <td>{data}</td>
                        </tr>
                        );
                    })}
                    </Col>
                    <Col md={11} id="pl-table">
                    <iframe title="large-table" frameborder="0"  scrolling="no" width="1095" height="780" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=&timezone=Europe/London&time=12&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=1&width=1095&height=780&font=Verdana&fs=14&lh=28&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=dc3545&hfc=FFFFFF"></iframe>
                    </Col>
                    <Col md={6}>
                        <div className="legend">
                            <span>C</span> - Champions
                            <span>CL</span> - Champions League
                            <span>EL</span> - Europa League
                            <br/>
                            <br/>
                            <span>ECL</span> - Europa Conference League
                            <span>R</span> - Relegation
                        </div>
                    </Col>
                </Row>

                <Row id="mid-table">
                    <Col md={1} className="status">
                    {this.state.status.map((data, index) => {
                        return (
                        <tr key={index}>
                            <td>{data}</td>
                        </tr>
                        );
                    })}
                    </Col>
                    <Col md={11} id="pl-table">
                    <iframe title="mid-table" frameborder="0"  scrolling="no" width="910" height="750" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=&timezone=Europe/London&time=12&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=1&width=910&height=700&font=Verdana&fs=14&lh=28&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=dc3545&hfc=FFFFFF"></iframe>
                    </Col>
                    <Col md={7}>
                        <div className="legend">
                            <span>C</span> - Champions
                            <span>CL</span> - Champions League
                            <span>EL</span> - Europa League
                            <br/>
                            <br/>
                            <span>ECL</span> - Europa Conference League
                            <span>R</span> - Relegation
                        </div>
                    </Col>
                </Row>

                <Row id="ipad-table">
                    <Col md={1} className="status">
                    {this.state.status.map((data, index) => {
                        return (
                        <tr key={index}>
                            <td>{data}</td>
                        </tr>
                        );
                    })}
                    </Col>
                    <Col md={11} id="pl-table">
                    <iframe title="ipad-table" frameborder="0"  scrolling="no" width="670" height="780" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=&timezone=Europe/London&time=12&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=1&width=670&height=780&font=Verdana&fs=14&lh=28&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=dc3545&hfc=FFFFFF"></iframe>
                    </Col>
                    <Col md={7}>
                        <div className="legend">
                            <span>C</span> - Champions
                            <span>CL</span> - Champions League
                            <span>EL</span> - Europa League
                            <br/>
                            <br/>
                            <span>ECL</span> - Europa Conference League
                            <span>R</span> - Relegation
                        </div>
                    </Col>
                </Row>

                <Row id="small-table">
                    <Col md={12} id="pl-table">
                    <iframe title="small-table" frameborder="0"  scrolling="no" width="350" height="600" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&stage=&team=&timezone=Europe/London&time=12&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=0&width=350&height=550&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=dc3545&hfc=FFFFFF"></iframe>
                    </Col>
                    <Col xs={12}>
                        <div className="legend">
                            <span>1</span> - Champions
                            <span>1-4</span> - Champions League
                            <br/>
                            <br/>
                            <span>5-6</span> - Europa League
                            <span>7</span> - Europa Conference League
                            <br/>
                            <br/>
                            <span>18-20</span> - Relegation
                        </div>
                    </Col>
                </Row>
                </div>

                <h3 className="mr-3 ml-3">Previous Games</h3>
                <Fixtures14 />
                <Fixtures13 />
                <Fixtures12 />
            </div>
        )
    }
}
