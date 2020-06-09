import { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { PersistedData } from 'apollo-cache-persist/types';

let updateCacheHandler = () => {};

export const cache = new InMemoryCache();
export const CACHE_STORAGE_KEY = 'apollo-cache';
export const onCacheUpdate = (fn: () => void) => {
  updateCacheHandler = fn;
};

persistCache({
  cache,
  key: CACHE_STORAGE_KEY,
  storage: {
    getItem: (key: string) => window.localStorage.getItem(key),
    removeItem: (key: string) => window.localStorage.removeItem(key),
    setItem: (key: string, data: PersistedData<any>) => {
      window.localStorage.setItem(key, data);
      updateCacheHandler();
    },
  },
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
