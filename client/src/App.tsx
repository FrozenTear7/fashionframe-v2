import * as React from 'react';
// import { Redirect, Route, Switch } from 'react-router';
import logo from './logo.svg';
import './App.css';

const App: React.VFC = () => {
  return (
    <div className="App">
      {/* <Switch>
        <Route exact path="/invoices/dashboard" component={Dashboard} />
        <Route path="/invoices/:id" component={Invoice} />
      </Switch> */}

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
