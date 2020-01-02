import { withClientState } from 'apollo-link-state';
import { InMemoryCache, ApolloLink } from 'apollo-boost';
import { authCache } from './cache';

const stateLink = (cache: InMemoryCache, defaultCache: authCache): ApolloLink =>
  withClientState({
    cache,
    resolvers: {},
    defaults: defaultCache,
  });

export default stateLink;
