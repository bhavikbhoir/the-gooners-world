import React, { Suspense, lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

const Home = lazy(() => import('./components/Home'));
const Center = lazy(() => import('./components/Center'));
const Archive = lazy(() => import('./components/Archive'));
const NewsCenter = lazy(() => import('./components/News_center'));
const About = lazy(() => import('./components/About'));
const Navigation = lazy(() => import('./components/Navbar'));

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>}>
        <Navigation />
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
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
