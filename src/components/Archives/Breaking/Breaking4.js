import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import TweetEmbed from 'react-tweet-embed'
export default class Breaking extends Component {
    render() {
        return (
            <div className="breaking">
                <h3>Super Drama!<span role="img" aria-label="super league reaction icon"> 😱</span> #NoSuperLeague</h3>
                <Row>                  
                    <Col lg={5} md={12} sm={12} className="pt-0 pr-1 pl-1 breaking-asset">
                    <TweetEmbed id="1384626900056805379"/>
                    </Col>
                    <Col lg={7} md={12} sm={12} className="breaking-content">
                        <p style={{textAlign: "left", fontSize: "1.125rem"}}>
                            April 19-20, 2021 will probably go down as the most dramatic 48 hours of Arsenal History and Football History in general.
                            <br/>
                            <br/>
                            It all started when Arsenal announced that they'll be one of the founding members of the new breakaway European Super league along with the
                            other top clubs from Europe including Chelsea, Manchester City, Manchester United, Liverpool, Tottenham, Barcelona, Real Madrid, Atletico Madrid, Juventus, Inter Milan, and AC Milan 
                            with 3 more clubs joining them as founders soon. The remaining 5 spots will be taken by teams passing the qualification matches to make up the 20 teams for the Super League.
                            <br/>
                            <br/>
                            This News didn't go down well with the Fans, players, excluded clubs, and the officials of UEFA and FIFA who went on to declare that the teams participating in this breakaway league will be banned from the competitions such as the World Cup, Euros, UCL, and UEL.
                            <br/>
                            <br/>
                            The fans, players, and managers expressed their disappointment in their respective club's decision. 
                            Hector Bellerin shared the famous Arsene Wenger farewell message - "To all the Arsenal lovers take care of the values of the club. My love and support forever."
                            <br/>
                            <br/>
                            Arsene Wenger himself expressed his thoughts on this league formation - 
                            “I would say it's a bad idea. Football has to stay united, it’s the most important thing.

                            It’s based on sporting merit and to respect the history that has been built from European football.

                            I believe, personally, that this idea will not go far." [TalkSport]
                            <br/>
                            <br/>
                            24 hours later, it seemed that the league was in trouble given the circumstances and actions taken by the fans, FA, UEFA, and other official parties.
                            Chelsea was the first club to withdraw their participation which was followed by Arsenal and other English clubs. Barcelona, Real Madrid, and Juventus have still maintained their participation in this project but it seems to be unlikely that this league will go ahead.
                            <br/>
                            <br/>
                            In the end, it's all good in the hood but Arsenal's struggles on the pitch continue with a disappointing defeat against Everton. With the Europa league looming over us, it seems to be our only hope of salvaging this season and cementing a spot in next year's Champions League.
                        </p>
                    </Col> 
                    <Col className="card-footer">
                        <span>Apr 20, 2021</span>
                    </Col> 
                </Row>                    
            </div>
        )
    }
}
