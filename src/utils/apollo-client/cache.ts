import { InMemoryCache } from 'apollo-boost';

export const appCache = new InMemoryCache();

export interface authCache {
  auth: {
    __typename: 'auth';
    tokenHasExpired: boolean;
  };
}

export const defaultCache: authCache = {
  auth: {
    __typename: 'auth',
    tokenHasExpired: false,
  },
};
