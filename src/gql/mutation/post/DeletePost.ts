import {gql} from '@apollo/client';

export const DELETE_POST = gql`
  mutation deletePost($id: Int!) {
    post: deleteMyPost(id: $id) {
      id
    }
  }
`;
