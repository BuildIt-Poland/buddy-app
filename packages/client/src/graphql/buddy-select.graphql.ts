import gql from 'graphql-tag';

export const BUDDY_SELECT = gql`
  query talent($talentId: ID!) {
    talent(talentId: $talentId) {
      id
      name
      role
      photo
      buddies {
        id
        photo
        name
        position
        role
        talents {
          id
          buddies {
            id
          }
        }
      }
    }
  }
`;
