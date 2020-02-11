import { ApolloLink } from 'apollo-boost';
import { auth } from 'utils';

const authLink = new ApolloLink((operation, forward) => {
  const token = auth.getToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

export default authLink;
