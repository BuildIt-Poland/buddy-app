import gql from 'graphql-tag';

export const AVATAR_HEADER = gql`
  query getAvatarDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      id
      name
      position
      photo
    }
  }
`;
