import React from 'react';
import '../components/styles.scss';
import { Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaInstagram, FaFutbol, FaNewspaper } from 'react-icons/fa';
import XIcon from './XIcon';
import McpConnect from './McpConnect';

export default function About() {
  React.useEffect(() => {
    document.getElementById("about").classList.add("active");
  });

  return (
    <div className="about">
      <Row className="text-center">
        <Col xs={12} className="about_message">
          {/* The h3 used to sit inside this p. Browsers auto-close a paragraph
              before a heading, so the markup React rendered never matched the
              markup written here — and the spacing drifted with it. */}
          <h3>Your home for all things Arsenal F.C.</h3>
          <p>
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
            <XIcon size={20} /> <a href="https://x.com/TheGoonersWorld">@TheGoonersWorld</a>
            <br />
            <FaInstagram style={{ color: "#C13584" }} /> <a href="https://www.instagram.com/thegoonersworld/">@thegoonersworld</a>
          </div>
        </Col>
        <Col xs={12} className="mb-2">
          <h4>Independence &amp; Ownership</h4>
          <div className="about__independence">
            <p>
              The Gooners World is an <strong>independent, non-commercial project</strong>, built and
              maintained by a single supporter as a personal engineering and learning exercise. It
              carries no advertising, sells nothing, and accepts no sponsorship or donations.
            </p>
            <p>
              It is <strong>not affiliated with, endorsed by, or associated with</strong> Arsenal
              Football Club, the Premier League, UEFA, or any of their partners. All club names,
              crests, badges and trademarks are the property of their respective owners and are used
              here only to identify the teams and competitions being reported on.
            </p>
            <p>
              Match data and imagery are sourced from the licensed providers listed above. We publish
              no broadcast footage. Editorial summaries and match reviews are generated with AI from
              that data and are clearly our own opinion, not reporting on behalf of any club.
            </p>
          </div>
        </Col>
      </Row>
      <McpConnect />
    </div>
  );
}
