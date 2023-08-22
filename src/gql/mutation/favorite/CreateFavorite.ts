import {gql} from '@apollo/client';

export const CREATE_FAVORITE = gql`
  mutation CreateFavorite($createFavoriteInput: CreateFavoriteInput!) {
    createFavorite(createFavoriteInput: $createFavoriteInput) {
      song {
        title
        id
        url
        duration
        date
        artwork {
          url_64
          url_128
          url
          id
        }
        artist {
          name
          id
          cover {
            url_64
            url_128
            url
            name
            id
          }
          content
          albums {
            id
            cover {
              url_64
              url_128
              url
              id
              name
            }
          }
        }
      }
      show {
        name
        id
        date
        image {
          url_64
          url_128
          url_1536
          url
          name
          id
        }
        content
        seasons {
          number
          name
          id
          episodes {
            number
            name
            duration
            id
          }
        }
      }
      post {
        views
        title
        id
        createdAt
        author {
          id
          firstname
          lastname
          avatar {
            url_512
            url_256
            id
          }
        }
        images {
          url_64
          url_128
          url
          id
        }
      }
      podcastEpisode {
        id
        url
        title
        createdAt
        date
        duration
        podcastAlbum {
          id
          name
        }
        artwork {
          url_256
          url_512
          url_1536
        }
        media {
          hls {
            m3u8Url
          }
        }
      }
      id
    }
  }
`;
