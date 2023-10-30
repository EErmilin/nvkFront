import { gql } from "@apollo/client";

export const GET_SERIALS = gql`
  query Serials {
    serials {
      seriesSeasons {
        number
      }
      imageId
      name
      id
    }
  }
`;
