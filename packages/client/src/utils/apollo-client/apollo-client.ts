import { ApolloClient, from } from 'apollo-boost';
import { cache, setCacheToken } from './cache';
import { queueLink, serializingLink, retryLink, trackerLink } from './offline-links';
import errorLink from './error-link';
import authLink from './auth-link';
import httpLink from './http-link';

window.addEventListener('offline', () => queueLink.close());
window.addEventListener('online', () => queueLink.open());

const client = new ApolloClient({
  link: from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    authLink,
    errorLink,
    httpLink,
  ]),
  cache,
  resolvers: {},
});

cache.writeData({
  data: {
    ...setCacheToken(false),
  },
});

export default client;
