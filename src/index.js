import React, { useState} from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Game from './Game';
import GithubCardsApp from './Github_Cards'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
//import { Nav, NavDropdown, Dropdown } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import ButtonExample from './ButtonExample';
import StarMatch from './Stars';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ReactOneMin from './ReactOneMin'

export default function App() {
    const [starMatchGameId, setStarMatchGameId] = useState(1);

    const startNewGame = () => setStarMatchGameId(starMatchGameId + 1);

    return (
      <Router>
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">Brian's React Stuff</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarColor01">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/" >Home</Link>
      </li>      
      <li className="nav-item active">
        <Link className="nav-link" to="/reactOneMin">React 1 Minute</Link>
      </li>      
      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Intro To React
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <DropdownItem><Link to="/starmatch">Star Match</Link></DropdownItem>
            <DropdownItem><Link to="/button">Button Example</Link></DropdownItem>
            <DropdownItem><Link  to="/game">Game</Link></DropdownItem>
            <DropdownItem><Link  to="/cards">Github Cards</Link></DropdownItem>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>
      </li>
    </ul>
  </div>
</nav>
          

  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/game">
                <Game />
            </Route>
            <Route path="/cards">
                <GithubCardsApp />
            </Route>
            <Route path="/button">
                <ButtonExample />
            </Route>
            <Route path="/starmatch">
                <StarMatch key={starMatchGameId} resetGame={() => startNewGame()} />
            </Route>
            <Route path="/reactOneMin">
                <ReactOneMin></ReactOneMin>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

  function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }
  

  ReactDOM.render(
    <div className="container">
        <App />
    </div>,
    document.getElementById('root')
  );
  