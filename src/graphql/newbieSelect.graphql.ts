import gql from 'graphql-tag';

const NEWBIE_SELECT = gql`
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

export default NEWBIE_SELECT;
