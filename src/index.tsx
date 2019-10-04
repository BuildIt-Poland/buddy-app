import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN || '');

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
