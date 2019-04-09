/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Signup from './Signup';
import Signin from './Signin';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/login" component={Signin} />
          <PrivateRoute path="/protected-path" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
