import gql from 'graphql-tag';

export const AVATAR_HEADER = gql`
  query getAvatarDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      name
      position
      photo
      tasksInfo {
        buddyProgress
      }
    }
  }
`;
