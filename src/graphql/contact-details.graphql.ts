import gql from 'graphql-tag';

const CONTACT_DETAILS = gql`
  query getContactDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      name
      position
      startDate
      email
      phoneNumber
      photo
      notes
    }
  }
`;

const BUDDY_BASIC_DETAILS = gql`
  query getBuddyBasicDetails($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
      name
      email
      photo
      newbies {
        name
        photo
      }
    }
  }
`;

const NEWBIE_BASIC_DETAILS = gql`
  query getNewbieBasicDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      name
      email
    }
  }
`;

export { CONTACT_DETAILS, NEWBIE_BASIC_DETAILS, BUDDY_BASIC_DETAILS };
