import gql from 'graphql-tag';

export const ADD_FROM_TEMPLATE = gql`
  mutation addFromTemplate($newbieId: ID!, $template: TaskTemplates!) {
    addFromTemplate(newbieId: $newbieId, template: $template) {
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
