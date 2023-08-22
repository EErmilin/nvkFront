import {gql} from '@apollo/client';

export const REGISTER = gql`
  mutation RegisterMutation($signUpInput: SignUpInput!) {
    register(signUpInput: $signUpInput) {
      user {
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
      accessToken
    }
  }
`;
