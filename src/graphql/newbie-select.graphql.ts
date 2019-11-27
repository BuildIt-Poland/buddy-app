import gql from 'graphql-tag';

export const NEWBIE_SELECT = gql`
  query buddy($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
      id
      name
      role
      photo
      newbies {
        id
        photo
        name
        startDate
        position
        tasksInfo {
          buddyProgress
        }
      }
    }
  }
`;
