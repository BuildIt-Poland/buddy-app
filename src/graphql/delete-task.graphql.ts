import gql from 'graphql-tag';

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
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
