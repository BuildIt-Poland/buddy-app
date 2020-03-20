export const templateTaskListQuery = `
  query ($template: String!){
    newbie(where: {
      email: $template
    }) {
      newbieTasks {
        title
        description
        status
        implementationDate
        notes
      }
      buddyTasks {
        title
        description
        status
        implementationDate
      }
    }
  }
`;

export const taskQuery = `
  query ($id: ID!){
    buddyTask(where: {
      id: $id
    }) {
      newbie {
        id
      }
    }
    newbieTask(where: {
      id: $id
    }) {
      newbie {
        id
      }
    }
  }
`;
