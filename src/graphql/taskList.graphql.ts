import gql from 'graphql-tag';

const TASK_LIST = gql`
  query newbie($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
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

export default TASK_LIST;
