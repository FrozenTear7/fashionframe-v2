import * as React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Setup from './components/Setup/Setup';
import Setups from './components/Setups/Setups';
import User from './components/User/User';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';

const App: React.VFC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/setups" component={Setups} />
        <Route exact path="/setups/:id" component={Setup} />
        <Route path="/profile" component={User} />
        <Route path="/user/:id" component={User} />
      </Switch>
    </div>
  );
};

export default App;
