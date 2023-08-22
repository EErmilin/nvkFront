import {gql} from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUserMut($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
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

export const UPDATE_HASHTAGS = gql`
  mutation UpdateHashtags($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      hashtags {
        hashtag {
          id
          name
        }
      }
    }
  }
`;
