import gql from 'graphql-tag';

export const TASK_LIST = gql`
  query newbie($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      id
      newbieTasks {
        id
        title
        description
        status
      }
      buddyTasks {
        id
        title
        description
        status
      }
    }
  }
`;
