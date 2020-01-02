import { onError } from 'apollo-link-error';
import { ApolloLink, InMemoryCache } from 'apollo-boost';
import { authCache } from './cache';

const errorLink = (appCache: InMemoryCache): ApolloLink =>
  onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(error => {
        if (error.name === 'UNAUTHENTICATED') {
          appCache.writeData<authCache>({
            data: {
              auth: {
                __typename: 'auth',
                tokenHasExpired: true,
              },
            },
          });
        }
      });
    }
  });

export default errorLink;
