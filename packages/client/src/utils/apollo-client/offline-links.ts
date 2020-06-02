import QueueLink from 'apollo-link-queue';
import { ApolloLink } from 'apollo-boost';
import { RetryLink } from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';

const queueLink = new QueueLink();
const serializingLink = new SerializingLink();
const retryLink = new RetryLink({ attempts: { max: Infinity } });

const trackerLink = new ApolloLink((operation, forward) => {
  if (forward === undefined) return null;

  const KEY = 'trackedQueries';
  const context = operation.getContext();
  const trackedQueries = JSON.parse(window.localStorage.getItem(KEY) || '[]');

  if (context.tracked !== undefined) {
    const { operationName, query, variables } = operation;

    const newTrackedQuery = {
      query,
      context,
      variables,
      operationName,
    };

    window.localStorage.setItem(
      KEY,
      JSON.stringify([...trackedQueries, newTrackedQuery])
    );
  }

  return forward(operation).map(data => {
    if (context.tracked !== undefined) {
      window.localStorage.setItem(KEY, JSON.stringify(trackedQueries));
    }

    return data;
  });
});

export { queueLink, serializingLink, retryLink, trackerLink };
