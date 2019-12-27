import gql from 'graphql-tag';

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!, $newbieId: ID!) {
    deleteTask(taskId: $taskId, newbieId: $newbieId) {
      id
      newbieTasks {
        id
      }
      buddyTasks {
        id
      }
      tasksInfo {
        buddyProgress
      }
    }
  }
`;
