import {gql} from '@apollo/client';

export const PODCASTS = gql`
  query Songs($take: Int) {
    podcasts(take: $take) {
      name
      id
      podcastAlbums {
        name
        id
        cover {
          url_512
          url_256
          url_1536
        }
      }
    }
  }
`;

export const PODCAST_SEARCH = gql`
  query ($search: String, $skip: Int, $take: Int) {
    searchPodcasts(search: $search, skip: $skip, take: $take) {
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
        hls {
          m3u8Url
        }
      }
    }
  }
`;

export const PODCAST_ALBUM = gql`
  query PodcastAlbum($id: Int!) {
    podcastAlbum(id: $id) {
      id
      name
      cover {
        url_512
        url_256
        url_1536
      }
      podcastEpisode {
        title
        id
        podcastAlbum {
          id
          name
        }
        url
        artwork {
          url_512
          url_256
          url_1536
        }
        media {
          indexM3u8Url
        }
      }
    }
  }
`;

export const PODCAST_ALL_ALBUMS = gql`
  query Podcasts($podcastId: Int!, $skip: Int, $take: Int) {
    podcast(id: $podcastId, skip: $skip, take: $take) {
      id
      name
      podcastAlbums {
        name
        id
        content
        cover {
          url_512
          url_256
          url_1536
        }
      }
    }
  }
`;
