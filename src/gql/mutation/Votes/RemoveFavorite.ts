import {gql} from '@apollo/client';

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($removeFavoriteId: Int!) {
    removeFavorite(id: $removeFavoriteId) {
      id
    }
  }
`;
