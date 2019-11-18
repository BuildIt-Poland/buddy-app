import gql from 'graphql-tag';

const AVATAR_HEADER = gql`
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

export default AVATAR_HEADER;
