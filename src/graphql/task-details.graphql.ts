import gql from 'graphql-tag';

export const TASK_DETAILS = gql`
  query getTaskDetails($taskId: ID!) {
    task(taskId: $taskId) {
      title
      description
      status
    }
  }
`;

export default TASK_DETAILS;
