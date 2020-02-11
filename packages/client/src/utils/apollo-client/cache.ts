import { InMemoryCache } from 'apollo-boost';

export const cache = new InMemoryCache();

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
