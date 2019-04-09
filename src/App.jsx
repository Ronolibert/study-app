/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Signup from './Signup';
import Signin from './Signin';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import CreateDeck from './CreateDeck';

function App() {
  return (
    <div>
      <Sidebar>
        <Router>
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route path="/login" component={Signin} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-deck" component={CreateDeck} />
          </Switch>
        </Router>
      </Sidebar>
    </div>
  );
}

export default App;
