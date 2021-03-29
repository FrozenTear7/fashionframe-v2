import * as React from 'react';
import { Route, Switch } from 'react-router';
import logo from './logo.svg';
import './App.css';
import Setup from './components/Setup/Setup';
import Setups from './components/Setups/Setups';
import User from './components/User/User';
import Header from './components/Header/Header';

const App: React.VFC = () => {
  return (
    <div className="App">
      Fashionframe
      <Header />
      <Switch>
        <Route exact path="/setups" component={Setups} />
        <Route exact path="/setups/:id" component={Setup} />
        <Route exact path="/profile" component={User} />
        <Route exact path="/user/:id" component={User} />
      </Switch>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
