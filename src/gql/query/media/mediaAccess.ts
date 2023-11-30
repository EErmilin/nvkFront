import { gql } from "@apollo/client";

export const GET_MEDIA_ACCESS = gql`
  query getMediaAccess($mediaId: Int!, $userId: Int!) {
    mediaAccess(mediaId: $mediaId, userId: $userId)
  }
`;
