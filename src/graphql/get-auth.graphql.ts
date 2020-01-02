import gql from 'graphql-tag';

export const GET_LOCAL_AUTH = gql`
  query auth {
    auth @client {
      tokenHasExpired
    }
  }
`;
