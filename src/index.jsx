import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import client from './createClient.js';
import App from './App';

import 'normalize.css';

ReactDOM.render(
  <ApolloProvider client={client()}>
    <App />
  </ApolloProvider>,

  document.getElementById('root')
);
