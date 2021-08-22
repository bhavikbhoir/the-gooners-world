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
import QuickLook from './QuickLook';

function Home() {
  React.useEffect(()=> {
    document.getElementById("home").classList.add("active")
})
  return (
    <div className="App">
        <QuickLook />
        <Quote />
        <Content />
        <Fixtures />
        <Breaking />
        <Trending />
        <NEWS />
        <TRANSFER />
        <Stat />
        <Social />
    </div>
  );
}

export default Home;