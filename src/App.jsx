import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Signup from './Signup';
import Signin from './Signin';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import CreateDeck from './CreateDeck';
import DeckOfCards from './DeckOfCards';

function App() {
  return (
    <div>
      <Router>
        <Sidebar>
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route path="/login" component={Signin} />
            <PrivateRoute path="/deck/:deckId" component={DeckOfCards} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-deck" component={CreateDeck} />
          </Switch>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
