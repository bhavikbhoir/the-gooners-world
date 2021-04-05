import React, { Component } from 'react';
import '../components/styles.css';
import { Row, Col, Button } from 'react-bootstrap';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';
import InstagramButton from  "react-instagram-button";
import { FaInstagram, FaTwitter } from 'react-icons/fa';

export default class Social extends Component {
    render() {
        return (
            <div className="social">
                <h2>Get regular updates on our social media pages.</h2>
                <Row>
                    <Col id="twitter">
                    {/* <a className="twitter-follow-button"
                    href="https://twitter.com/TheGoonersWorld"
                    data-size="large"
                    data-show-count="false">
                    Follow @TheGoonersWorld</a> */}
                    <button><a
                        href="https://twitter.com/TheGoonersWorld"
                        data-show-count="false">
                        <FaTwitter /> Follow @TheGoonersWorld</a>
                        </button>
                        <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="thegoonersworld"
                        options={{height: 913}}
                        />
                    </Col>
                    <Col id="insta">
                        {/* <InstagramButton username={"thegoonersworld"}/> */}
                        <button><a className="instagram-follow-button"
                        href="https://instagram.com/thegoonersworld"
                        data-show-count="false">
                        <FaInstagram /> Follow @thegoonersworld</a>
                        </button>
                        {/* <InstagramEmbed
                        // clientAccessToken='1:728904719682:web:256b0d5e7c68aa49143cdb'
                        url='https://www.instagram.com/p/CGolekHj4Bp/'
                        // maxWidth={500}
                        hideCaption={false}
                        containerTagName='div'
                        injectScript
                        protocol=''
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}
                        /> */
                        
                        <blockquote 
                        class="instagram-media" 
                        data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/CE277sBjbd1/?utm_source=ig_embed&amp;utm_campaign=loading" 
                        data-instgrm-version="13"
                        style={{width:"100%"}}
                        >

	                    <div> 
                            <a href="https://www.instagram.com/p/CE277sBjbd1/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank"> 
                            <div> 
			                    <div> View this post on Instagram</div>
		                    </div>
                            </a>
                            
                            <p>
                                <a href="https://www.instagram.com/p/CE277sBjbd1/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank">A post shared by The Gooners World (@thegoonersworld)</a>
                            </p>
                        </div>
                        </blockquote>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
