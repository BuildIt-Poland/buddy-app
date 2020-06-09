import QueueLink from 'apollo-link-queue';
import { ApolloLink } from 'apollo-boost';
import { RetryLink } from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';
import { auth } from 'utils';

const queueLink = new QueueLink();
const serializingLink = new SerializingLink();
const retryLink = new RetryLink({ attempts: { max: Infinity } });

const trackerLink = new ApolloLink((operation, forward) => {
  if (forward === undefined) return null;

  const KEY = 'trackedQueries';
  const context = operation.getContext();
  const trackedQueries = JSON.parse(window.localStorage.getItem(KEY) || '[]');
  const definition: any = operation.query.definitions[0];

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

  if (definition?.operation === 'query') {
    const path = window.location.pathname;
    const queryInfo = auth.getQueryInfo();
    const queryIds = queryInfo[path] || [];
    const key = Object.keys(operation.variables)[0];
    const queryId = operation.variables[key];

    queryInfo[path] = [...new Set([...queryIds, queryId])];
    auth.setQueryInfo(queryInfo);
  }

  return forward(operation).map(data => {
    if (context.tracked !== undefined) {
      window.localStorage.setItem(KEY, JSON.stringify(trackedQueries));
    }

    return data;
  });
});

export { queueLink, serializingLink, retryLink, trackerLink };
