import { gql } from 'apollo-boost';

export const BUDDY_MENU_DETAILS = gql`
  query getBuddyMenuDetails($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
      id
      name
      email
      allowPushedNotifications
      photo
      newbies {
        id
        name
        photo
      }
    }
  }
`;

export const NEWBIE_MENU_DETAILS = gql`
  query getNewbieMenuDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      id
      name
      email
      allowPushedNotifications
      photo
      buddy {
        id
        name
        photo
      }
    }
  }
`;
