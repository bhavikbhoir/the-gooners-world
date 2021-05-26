import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { FaArchive, FaFutbol, FaHome, FaNewspaper, FaQuestionCircle } from 'react-icons/fa';

function Navigation(){
        
return (
        <div className="sticky-navigation">
        <Navbar collapseOnSelect expand="md">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
            <Row>
                <Col>
                <Nav.Item>
                <Nav.Link id="home" href="/"><FaHome /> Home</Nav.Link>
                </Nav.Item>
                </Col>
                <Col>

                <Nav.Item>
                <Nav.Link id="match-center" href="/MatchCenter"><FaFutbol /> Match Center</Nav.Link>
                </Nav.Item>
                </Col>

                <Col>
                <Nav.Item>
                <Nav.Link id="news-center" href="/NewsCenter"><FaNewspaper/> News Center</Nav.Link>
                </Nav.Item>
                </Col>
                                
                <Col>
                <Nav.Item>
                <Nav.Link id="archives" href="/Archives"><FaArchive/> Archives</Nav.Link>
                </Nav.Item>
                </Col>

                <Col>
                <Nav.Item>
                <Nav.Link id="about" href="/About"><FaQuestionCircle /> About</Nav.Link>
                </Nav.Item>
                </Col>
            </Row>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
        </div>
        )
};

export default Navigation