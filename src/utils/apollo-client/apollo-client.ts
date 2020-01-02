import { ApolloClient, from } from 'apollo-boost';
import { appCache, defaultCache } from './cache';
import stateLink from './state-link';
import errorLink from './error-link';
import authLink from './auth-link';
import httpLink from './http-link';

const client = new ApolloClient({
  link: from([
    authLink,
    errorLink(appCache),
    stateLink(appCache, defaultCache),
    httpLink,
  ]),
  cache: appCache,
});

export default client;
