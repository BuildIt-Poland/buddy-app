import gql from 'graphql-tag';

export const TASK_LIST = gql`
  query newbie($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      id
      name
      newbieTasks {
        id
        title
        description
        status
        newbie {
          name
        }
      }
      buddyTasks {
        id
        title
        description
        status
        newbie {
          name
        }
      }
    }
  }
`;
