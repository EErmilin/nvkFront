import {gql} from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
    }
  }
`;
