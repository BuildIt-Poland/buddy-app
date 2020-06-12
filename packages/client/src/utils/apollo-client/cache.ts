import { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { PersistedData } from 'apollo-cache-persist/types';
import localForage from 'localforage';

let updateCacheHandler = () => {};

export const CACHE_STORAGE_KEY = 'apollo-state';
export const cache = new InMemoryCache({
  freezeResults: true,
});
export const onCacheUpdate = (fn: () => void) => {
  updateCacheHandler = fn;
};

persistCache({
  cache,
  key: CACHE_STORAGE_KEY,
  storage: {
    getItem: (key: string) => localForage.getItem(key),
    removeItem: (key: string) => localForage.removeItem(key),
    setItem: (key: string, data: PersistedData<any>) => {
      const result = localForage.setItem(key, data);
      updateCacheHandler();
      return result;
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
