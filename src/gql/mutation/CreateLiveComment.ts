import { gql } from "@apollo/client";

export const CREATE_LIVE_COMMENT = gql`
  mutation CreateLiveStreamsComment(
    $createLiveStreamsCommentInput: CreateLiveStreamsCommentInput!
  ) {
    createLiveStreamsComment(
      createLiveStreamsCommentInput: $createLiveStreamsCommentInput
    ) {
      liveId
      id
      comment
    }
  }
`;
