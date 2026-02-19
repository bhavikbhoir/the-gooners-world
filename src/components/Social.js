import React, { Component } from 'react';
import '../components/styles.css';
import { Row, Col } from 'react-bootstrap';
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
                            target="_blank"
                            rel="noopener noreferrer">
                            <FaTwitter /> Follow @TheGoonersWorld</a>
                        </button>
                        <div style={{padding: "2rem", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px", marginTop: "1rem"}}>
                            <FaTwitter size={48} style={{color: "#1DA1F2", marginBottom: "1rem"}} />
                            <p>Follow us on X (Twitter) for live match updates, breaking news, and Arsenal content!</p>
                            <a 
                                href="https://twitter.com/TheGoonersWorld" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{display: "inline-block", padding: "10px 20px", background: "#1DA1F2", color: "white", borderRadius: "5px", textDecoration: "none"}}>
                                View on X
                            </a>
                        </div>
                    </Col>
                    <Col id="insta">
                        <button><a 
                            href="https://instagram.com/thegoonersworld"
                            target="_blank"
                            rel="noopener noreferrer">
                            <FaInstagram /> Follow @thegoonersworld</a>
                        </button>
                        <div style={{padding: "2rem", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px", marginTop: "1rem"}}>
                            <FaInstagram size={48} style={{color: "#E1306C", marginBottom: "1rem"}} />
                            <p>Follow us on Instagram for photos, highlights, and behind-the-scenes Arsenal content!</p>
                            <a 
                                href="https://instagram.com/thegoonersworld" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{display: "inline-block", padding: "10px 20px", background: "#E1306C", color: "white", borderRadius: "5px", textDecoration: "none"}}>
                                View on Instagram
                            </a>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
