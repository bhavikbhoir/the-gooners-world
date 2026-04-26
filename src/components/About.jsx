import React from 'react';
import '../components/styles.scss';
import { Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaInstagram, FaTwitter, FaFutbol, FaNewspaper } from 'react-icons/fa';

export default function About() {
  React.useEffect(() => {
    document.getElementById("about").classList.add("active");
  });

  return (
    <div className="about">
      <Row className="text-center">
        <Col xs={12} className="about_message">
          <p>
            <h3>Your home for all things Arsenal F.C.</h3>
            Kicked off in September 2020 with passion to bring all the Arsenal Fans around the world,
            the latest team news, transfer updates, match results and reports along with weekly
            stats, trending updates, and matchday polls.
          </p>
        </Col>
        <Col md={6} sm={12} className="mb-2">
          <h4>Powered By</h4>
          <div className="about__partners">
            <p><FaFutbol className="mr-2" />
              <a href="https://www.football-data.org/" target="_blank" rel="noopener noreferrer">Football-Data.org</a> — Live fixtures, results & standings
            </p>
            <p><FaNewspaper className="mr-2" />
              <a href="https://newsdata.io/" target="_blank" rel="noopener noreferrer">NewsData.io</a> — Arsenal news feed
            </p>
          </div>
        </Col>
        <Col md={6} sm={12} className="mb-2">
          <h4>Contact Us</h4>
          <div className="contact">
            <FaEnvelope style={{ color: "#0F9D58" }} /> <a href="mailto:thegoonersworld@gmail.com">thegoonersworld@gmail.com</a>
            <br />
            <FaTwitter style={{ color: "rgb(29, 161, 242)" }} /> <a href="https://twitter.com/TheGoonersWorld">@TheGoonersWorld</a>
            <br />
            <FaInstagram style={{ color: "#C13584" }} /> <a href="https://www.instagram.com/thegoonersworld/">@thegoonersworld</a>
          </div>
        </Col>
      </Row>
    </div>
  );
}
