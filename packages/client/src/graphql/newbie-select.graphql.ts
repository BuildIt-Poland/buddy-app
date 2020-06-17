import gql from 'graphql-tag';

export const NEWBIE_SELECT = gql`
  query buddy($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
      id
      name
      position
      startDate
      email
      phoneNumber
      photo
      role
      allowPushedNotifications
      newbies {
        id
        name
        position
        startDate
        email
        phoneNumber
        photo
        role
        allowPushedNotifications
        newbieTasks {
          id
          status
        }
        buddyTasks {
          id
          status
        }
      }
    }
  }
`;
