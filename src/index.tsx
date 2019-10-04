import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App, { AUTH_TOKEN } from './App';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem(AUTH_TOKEN);

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Call the next link in the middleware chain.
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
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
