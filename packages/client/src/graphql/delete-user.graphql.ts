import gql from 'graphql-tag';

export const DELETE_NEWBIE = gql`
  mutation deleteNewbie($userId: ID!) {
    deleteNewbie(newbieId: $userId) {
      id
      newbies {
        id
      }
    }
  }
`;

export const DELETE_BUDDY = gql`
  mutation deleteBuddy($userId: ID!) {
    deleteBuddy(buddyId: $userId) {
      talents {
        id
        buddies {
          id
        }
      }
    }
  }
`;

export const DELETE_TALENT = gql`
  mutation deleteTalent($userId: ID!) {
    deleteTalent(talentId: $userId) {
      id
    }
  }
`;
