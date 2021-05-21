import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Social from './components/Social';
import { Container } from 'react-bootstrap';
import Quote from './components/Quote';
import NEWS from './components/News/NEWS';
import TRANSFER from './components/Transfers/TRANSFER';
import Trending from './components/Trending';
import Fixtures from './components/Fixtures';
import Breaking from './components/Breaking';
import Stat from './components/Stats/Stat';

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Quote />
        <Content />
        <Fixtures />
        <Trending />
        <Breaking />
        <NEWS />
        <Stat />
        <TRANSFER />
        <Social />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
