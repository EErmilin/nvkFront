import {gql} from '@apollo/client';

export const LIVESTEAMS = gql`
  query LiveStreams {
    liveStreams {
      url
      name
      programs {
        startTime
        name
        id
        date
      }
      id
      cover
    }
  }
`;

export const LIVERSTREAM = gql`
  query LiveStream($id: Int!) {
    liveStream(id: $id) {
      url
      name
      programs {
        startTime
        name
        id
        date
      }
      id
      cover
      media {
        hls {
          id
          m3u8Url
          name
        }
      }
    }
  }
`;

export const LIVESTREAMS_IDS = gql`
  query LiveStreamsIds {
    liveStreams {
      id
      name
    }
  }
`;

export const LIVESTREAMS_PROGRAMS = gql`
  query LiveStreamsPrograms(
    $where: LiveStreamsProgramWhereInput
    $orderBy: LiveStreamsProgramOrderByWithRelationInput
  ) {
    liveStreamsPrograms(where: $where, orderBy: $orderBy) {
      id
      name
      date
      startTime
      endTime
    }
  }
`;
