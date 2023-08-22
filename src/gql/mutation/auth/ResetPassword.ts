import {gql} from '@apollo/client';

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $resetPasswordInput) {
      user {
        phoneVerified
        phone
        id
        firstname
        emailVerified
        email
        hashtags {
          hashtag {
            id
            name
          }
        }
      }
      accessToken
    }
  }
`;
