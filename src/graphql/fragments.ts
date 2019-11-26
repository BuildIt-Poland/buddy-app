import { gql } from 'apollo-boost';

export const FRAGMENTS = {
  DetailsFragment: gql`
    fragment DetailsFragment on User {
      name
      position
      startDate
      email
      phoneNumber
      photo
      role
    }
  `,
};
