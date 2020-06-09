import { ApolloClient, from } from 'apollo-boost';
import { auth } from 'utils';
import { cache, setCacheToken, CACHE_STORAGE_KEY } from './cache';
import { queueLink, serializingLink, retryLink, trackerLink } from './offline-links';
import errorLink from './error-link';
import authLink from './auth-link';
import httpLink from './http-link';

window.addEventListener('offline', () => queueLink.close());
window.addEventListener('online', () => queueLink.open());
window.addEventListener('beforeunload', () => {
  if (window.navigator.onLine) {
    const path = window.location.pathname;
    const queryInfo = auth.getQueryInfo();
    const queryIds = queryInfo[path];
    const cache = window.localStorage.getItem(CACHE_STORAGE_KEY) || '';
    const state = JSON.parse(cache);

    queryIds.forEach((queryId: string) => {
      const key = Object.keys(state.ROOT_QUERY).find(k => k.includes(queryId)) || '';
      delete state.ROOT_QUERY[key];
    });
    window.localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(state));
  }
});

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
