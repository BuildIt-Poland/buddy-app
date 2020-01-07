import { ApolloClient, from } from 'apollo-boost';
import { cache, setCacheToken } from './cache';
import errorLink from './error-link';
import authLink from './auth-link';
import httpLink from './http-link';

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache,
  resolvers: {},
});

cache.writeData({
  data: {
    ...setCacheToken(false),
  },
});

export default client;
