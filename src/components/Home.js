import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Social from './Social';
import { Container } from 'react-bootstrap';
import Quote from './Quote';
import NEWS from './News/NEWS';
import TRANSFER from './Transfers/TRANSFER';
import Trending from './Trending';
import Fixtures from './Fixtures';
import Breaking from './Breaking';
import Stat from './Stats/Stat';
import { Navbar } from './Navbar';

function Home() {
  return (
    <div className="App">
      {/* <Header />
      <Navbar />
      <Container> */}
        <Quote />
        <Content />
        <Fixtures />
        <Trending />
        <Breaking />
        <NEWS />
        <Stat />
        <TRANSFER />
        <Social />
      {/* </Container>
      <Footer /> */}
    </div>
  );
}

export default Home;
