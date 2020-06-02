import { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { ApolloPersistOptions } from 'apollo-cache-persist/types';

export const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage as ApolloPersistOptions<any>['storage'],
});

export interface AuthCache {
  auth: {
    __typename: 'auth';
    tokenHasExpired: boolean;
  };
}

export const setCacheToken = (tokenHasExpired: boolean): AuthCache => ({
  auth: {
    __typename: 'auth',
    tokenHasExpired,
  },
});
