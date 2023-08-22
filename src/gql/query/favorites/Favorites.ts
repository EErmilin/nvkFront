import {gql} from '@apollo/client';

export const FAVORITES = gql`
  query GetFavorites {
    favorites {
      id
      createdAt
      song {
        id
        url
        title
        artist {
          id
          name
        }
        album {
          id
          name
        }
        artwork {
          url_256
          url_512
          url_1536
        }
        media {
          indexM3u8Url
        }
      }
      show {
        name
        id
        date
        image {
          id
          url
          url_1536
          url_256
          url_512
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
        title
        published
        id
        images {
          id
          url
          url_1536
          name
          key
          date
        }
        hashtags {
          hashtag {
            id
            name
          }
        }
        views
        preview
        authorId
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
        createdAt
        updatedAt
        media {
          id
          name
          indexM3u8Url
          createdAt
          hls {
            createdAt
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
      podcastEpisode {
        id
        url
        title
        createdAt
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
          indexM3u8Url
        }
      }
    }
  }
`;
