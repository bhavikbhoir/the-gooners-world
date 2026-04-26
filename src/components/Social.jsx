import React from 'react';
import '../components/styles.css';
import { Row, Col } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import XIcon from './XIcon';

export default function Social() {
    return (
        <div className="social">
            <h2>Get regular updates on our social media pages.</h2>
            <Row>
                <Col id="twitter">
                    <button><a
                        href="https://x.com/TheGoonersWorld"
                        target="_blank"
                        rel="noopener noreferrer">
                        <XIcon size={14} /> Follow @TheGoonersWorld</a>
                    </button>
                    <div className="social__card">
                        <XIcon size={48} />
                        <p>Follow us on X for live match updates, breaking news, and Arsenal content!</p>
                        <a
                            href="https://x.com/TheGoonersWorld"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social__btn social__btn--x">
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
                    <div className="social__card">
                        <FaInstagram size={48} style={{color: "#E1306C", marginBottom: "1rem"}} />
                        <p>Follow us on Instagram for photos, highlights, and behind-the-scenes Arsenal content!</p>
                        <a
                            href="https://instagram.com/thegoonersworld"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social__btn social__btn--insta">
                            View on Instagram
                        </a>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
