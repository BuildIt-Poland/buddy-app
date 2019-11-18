import { gql } from 'apollo-boost';

export const BUDDY_USER_MENU_DETAILS = gql`
  query getBuddyUserMenuDetails($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
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

export const NEWBIE_USER_MENU_DETAILS = gql`
  query getNewbieUserMenuDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
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
