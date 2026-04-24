import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './Content';
import Social from './Social';
import Quote from './Quote';
import NewsFeed from './News/NewsFeed';
import Fixtures from './Fixtures';
import NewsTicker from './NewsTicker';
import Countdown from './Countdown';
import LiveScore from './LiveScore';

function Home() {
  React.useEffect(() => {
    document.getElementById("home").classList.add("active");
  });

  return (
    <div className="App">
      <NewsTicker />
      <LiveScore />
      <Quote />
      <Countdown />
      <Content />
      <Fixtures limit={4} />
      <NewsFeed count={5} />
      <Social />
    </div>
  );
}

export default Home;
