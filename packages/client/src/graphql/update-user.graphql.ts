import gql from 'graphql-tag';

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($userId: String!, $input: UserInput!) {
    updateUser(userId: $userId, input: $input) {
      id
    }
  }
`;
