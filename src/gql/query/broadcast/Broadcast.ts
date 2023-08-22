import {gql} from '@apollo/client';

export const BROADCASTS = gql`
  query Show(
    $search: String
    $skip: Int
    $take: Int
    $orderBy: ShowOrderByWithRelationInput
  ) {
    shows(search: $search, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      name
      content
      createdAt
      image {
        url_512
        url_1536
        url
      }
    }
  }
`;

export const BROADCAST = gql`
  query Show($showId: Int!) {
    show(id: $showId) {
      id
      name
      content
      createdAt
      image {
        id
        url_256
        url_512
        url_1536
        url
      }
      seasons {
        id
        showId
        number
        name
        createdAt
        episodes {
          name
          id
          duration
          number
          seasonId
          createdAt
          media {
            id
            name
            indexM3u8Url
            episodeId
            createdAt
            hls {
              id
              m3u8Url
              name
            }
            covers {
              url_512
              url_256
              url_1536
            }
          }
        }
      }
    }
  }
`;
