import React, { Component } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import bukayo from '../../../assets/bukayo.jpg'
export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3 id="kit" style={{marginBottom:"1rem"}}>Bukayo Saka - Player of the season!<span role="img" aria-label="chilli icon"> 🌶</span></h3>
                <Row>                  
                    <Col lg={6} md={12} sm={12} className="pt-0 pr-1 pl-1 breaking-asset">
                    <img src={bukayo} alt="Bukayo Saka - Player of the season!" style={{width: "100%", height: "100%"}}/>
                    </Col>
                    <Col lg={6} md={12} sm={12} className="breaking-content">
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            The Gooners World family has voted Bukayo Saka as the Arsenal player of the season 2020/21.
                            <br/>
                            <br/>
                            After having a breakthrough season last year and winning the FA Cup, the 19 year old English International produced yet another brilliant season.
                            <br/>
                            <br/>
                            It didn't take long for Saka to make a mark this season as he registered an assist in the 2020 FA Community Shield, which Arsenal clinched a 5–4 victory over Liverpool in the penalty shootout after the match was 1–1 after 90 minutes.
                            <br/>
                            <br/>
                            Due to his stellar performances, Saka was voted as the Player of the Month on Arsenal official website for three consecutive months (December - February).
                            On 6 March 2021, Saka made his 50th Premier League appearance for Arsenal in a 1–1 draw against Burnley; he's the second youngest player in club history to reach that milestone.
                            <br/>
                            <br/>
                            Saka also earned his first England senior team call when he debuted in a 3-0 victory over Wales on 4 Sepetember 2020.
                            <br/>
                            <br/>
                            Overall, Bukayo started 41 games this season with 4 substitute appearances and scored 7 goals with 7 assists for the Gunners.
                            <br/>
                            <br/>
                           <Table>
                               <thead>
                                   <th>Competition</th>
                                   <th>M</th>
                                   <th>Starts</th>
                                   <th>Mins</th>
                                   <th>G</th>
                                   <th>A</th>
                               </thead>
                               <tbody>
                                   <tr>
                                       <td>Overall</td>
                                       <td>45</td>
                                       <td>41</td>
                                       <td>3,575</td>
                                       <td>7</td>
                                       <td>7</td>
                                   </tr>
                                   <tr>
                                       <td>Premier League</td>
                                       <td>32</td>
                                       <td>29</td>
                                       <td>2,553</td>
                                       <td>5</td>
                                       <td>3</td>
                                   </tr>
                                   <tr>
                                       <td>Europa League</td>
                                       <td>9</td>
                                       <td>8</td>
                                       <td>699</td>
                                       <td>2</td>
                                       <td>3</td>
                                   </tr>
                               </tbody>
                           </Table>
                           Pepe (16G 5A) was voted as runner-up and Lacazette (17G 3A) as first runner-up.
                        </p>
                    </Col>  
                    <Col className="card-footer">
                        <span>May 23, 2021</span>
                    </Col>
                </Row>                    
            </div>
        )
    }
}
