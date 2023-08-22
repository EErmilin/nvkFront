import {gql} from '@apollo/client';

export const PROFILE = gql`
  query GetProfile {
    profile {
      id
      firstname
      phoneVerified
      phone
      emailVerified
      email
      birthdate
      hashtags {
        hashtag {
          id
          name
        }
      }
      avatar {
        url_128
        url_256
        id
      }
    }
  }
`;
