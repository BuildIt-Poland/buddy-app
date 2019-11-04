import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import cookieService from './cookie.service';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = cookieService.getToken();

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
