import gql from 'graphql-tag';

export const GLOBAL_NEWBIE_DATA = gql`
  query newbie($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      id
      photo
      name
      position
      role
      startDate
      email
      phoneNumber
      allowPushedNotifications
      notes

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

export const GLOBAL_BUDDY_DATA = gql`
  query buddy($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
      id
      photo
      name
      position
      role
      startDate
      email
      phoneNumber
      allowPushedNotifications

      newbies {
        id
        photo
        name
        position
        role
        startDate
        email
        phoneNumber
        allowPushedNotifications
        notes

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
  }
`;

export const GLOBAL_TALENT_DATA = gql`
  query talent($talentId: ID!) {
    talent(talentId: $talentId) {
      id
      name
      role
      photo
      position
      startDate
      email
      phoneNumber
      allowPushedNotifications

      buddies {
        id
        photo
        name
        position
        role
        startDate
        email
        phoneNumber
        allowPushedNotifications

        newbies {
          id
          photo
          name
          position
          role
          startDate
          email
          phoneNumber
          allowPushedNotifications
          notes

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

        talents {
          id
          buddies {
            id
          }
        }
      }
    }
  }
`;
