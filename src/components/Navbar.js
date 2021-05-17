import React, { Component } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
// import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar'
import { FaArchive, FaBook, FaCertificate, FaFootballBall, FaFutbol, FaHome, FaIdBadge, FaInfo, FaLightbulb, FaNewspaper, FaPencilAlt, FaRProject, FaSketch, FaStar, FaQuestionCircle } from 'react-icons/fa';

function Navigation(){
const[activeKey, setActiveKey] = React.useState("/")
        
return (
        <div>
        <Navbar collapseOnSelect expand="md">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav activeKey={activeKey}>
            <Row>
                <Col>
                <Nav.Item>
                <Nav.Link href="/" onClick={()=>{setActiveKey("/")}}><FaHome /> Home</Nav.Link>
                </Nav.Item>
                </Col>
                <Col>

                <Nav.Item>
                <Nav.Link href="/MatchCenter" onClick={()=>{setActiveKey("/MatchCenter")}}><FaFutbol /> Match Center</Nav.Link>
                </Nav.Item>
                </Col>

                <Col>
                <Nav.Item>
                <Nav.Link href="/NewsCenter" onClick={()=>{setActiveKey("/NewsCenter")}}><FaNewspaper/> News Center</Nav.Link>
                </Nav.Item>
                </Col>
                                
                <Col>
                <Nav.Item>
                <Nav.Link href="/Archives" onClick={()=>{setActiveKey("/Archive")}}><FaArchive/> Archives</Nav.Link>
                </Nav.Item>
                </Col>

                <Col>
                <Nav.Item>
                <Nav.Link href="/About" onClick={()=>{setActiveKey("/About")}}><FaQuestionCircle /> About</Nav.Link>
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