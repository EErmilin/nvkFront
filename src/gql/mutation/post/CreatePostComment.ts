import {gql} from '@apollo/client';

export const CREATE_POST_COMMENT = gql`
  mutation CreatePostComment($createPostCommentInput: CreatePostCommentInput!) {
    createPostComment(createPostCommentInput: $createPostCommentInput) {
      createdAt
      content
      user {
        firstname
        lastname
        avatar {
          id
          url_128
        }
      }
    }
  }
`;
