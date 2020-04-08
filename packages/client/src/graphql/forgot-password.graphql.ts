import gql from 'graphql-tag';

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation sendResetPasswordLink($email: String!, $url: String!) {
    sendResetPasswordLink(email: $email, url: $url) {
      userId
      token
      role
    }
  }
`;
