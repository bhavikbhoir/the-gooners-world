import React, { Component } from 'react';
import '../components/styles.css';
import { Row, Col } from 'react-bootstrap';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

export default class Social extends Component {
    render() {
        return (
            <div className="social">
                <h2>Get regular updates on our social media pages.</h2>
                <Row>
                    <Col id="twitter">
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
                        <button><a className="instagram-follow-button"
                        href="https://instagram.com/thegoonersworld"
                        data-show-count="false">
                        <FaInstagram /> Follow @thegoonersworld</a>
                        </button>
                        {
                        <blockquote 
                        class="instagram-media" 
                        data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/CE277sBjbd1/?utm_source=ig_embed&amp;utm_campaign=loading" 
                        data-instgrm-version="13"
                        style={{width:"100%"}}
                        >

	                    <div> 
                            <a href="https://www.instagram.com/p/CE277sBjbd1/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank"  rel="noopener noreferrer"> 
                            <div> 
			                    <div> View this post on Instagram</div>
		                    </div>
                            </a>
                            
                            <p>
                                <a href="https://www.instagram.com/p/CE277sBjbd1/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank"  rel="noopener noreferrer">A post shared by The Gooners World (@thegoonersworld)</a>
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
