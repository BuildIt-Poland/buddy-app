import gql from 'graphql-tag';

export const BUDDY_SELECT = gql`
  query talent($talentId: ID!) {
    talent(talentId: $talentId) {
      id
      name
      position
      startDate
      email
      phoneNumber
      photo
      role
      allowPushedNotifications
      buddies {
        id
        name
        position
        startDate
        email
        phoneNumber
        photo
        role
        allowPushedNotifications
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
