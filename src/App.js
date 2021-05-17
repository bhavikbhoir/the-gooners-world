import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
import Home from './components/Home';
import Center from './components/Center';
import Archive from './components/Archive';
import NewsCenter from './components/News_center';
import About from './components/About';
import Navigation from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Navigation /> */}
      <Container className="p-0">
        <Router>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/MatchCenter" component={Center} />
            <Route exact path="/Archives" component={Archive} />
            <Route exact path="/NewsCenter" component={NewsCenter} />
            <Route exact path="/About" component={About} />
            </Switch>
          </Router>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
