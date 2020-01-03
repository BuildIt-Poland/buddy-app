import { onError } from 'apollo-link-error';
import { AuthCache, cache, setCacheToken } from './cache';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(error => {
      if (error.name === 'UNAUTHENTICATED') {
        cache.writeData<AuthCache>({
          data: {
            ...setCacheToken(true),
          },
        });
      }
    });
  }
});

export default errorLink;
