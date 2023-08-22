import {gql} from '@apollo/client';

export const CREATE_USER = gql`
  mutation RegisterUser($signUpInput: SignUpInput!) {
    register(signUpInput: $signUpInput) {
      phoneVerified
      phone
      id
      firstname
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
