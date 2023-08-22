import {gql} from '@apollo/client';

export const QUESTION_IS_OPEN = gql`
  query IsOpen($liveStreamId: Int!) {
    liveStream(id: $liveStreamId) {
      isOpen
    }
  }
`;
