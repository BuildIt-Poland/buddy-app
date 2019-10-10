import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
