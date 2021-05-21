import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './Content';
import Social from './Social';
import Quote from './Quote';
import NEWS from './News/NEWS';
import TRANSFER from './Transfers/TRANSFER';
import Trending from './Trending';
import Fixtures from './Fixtures';
import Breaking from './Breaking';
import Stat from './Stats/Stat';

function Home() {
  return (
    <div className="App">
        <Quote />
        <Content />
        <Fixtures />
        <Trending />
        <Breaking />
        <NEWS />
        <Stat />
        <TRANSFER />
        <Social />
    </div>
  );
}

export default Home;