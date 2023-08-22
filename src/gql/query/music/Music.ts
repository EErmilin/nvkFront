import {gql} from '@apollo/client';

export const MUSIC = gql`
  query Songs($take: Int) {
    musics(take: $take) {
      albums {
        name
        id
        content
        cover {
          url_512
          url_256
          url_1536
        }
        artist {
          id
          name
        }
      }
      artists {
        name
        id
        content
        cover {
          url_256
          url_512
          url_1536
        }
      }
      playlists {
        content
        id
        name
        cover {
          url_512
          url_1536
          url_256
        }
      }
      songs {
        id
        url
        title
        createdAt
        artist {
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
  }
`;

export const MUSIC_SEARCH = gql`
  query ($search: String, $skip: Int, $take: Int) {
    searchMusics(search: $search, skip: $skip, take: $take) {
      songs {
        id
        url
        title
        createdAt
        artist {
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
  }
`;

export const FAVORITE_MUSIC = gql`
  query Songs {
    favorites {
      song {
        id
        url
        title
        createdAt
        artist {
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
  }
`;

export const SONG_MUSICS = gql`
  query Songs($skip: Int, $take: Int) {
    musics(skip: $skip, take: $take) {
      songs {
        id
        url
        title
        createdAt
        artist {
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
  }
`;

export const SONG_PLAYLISTS = gql`
  query Songs($skip: Int, $take: Int) {
    musics(skip: $skip, take: $take) {
      playlists {
        content
        id
        name
        createdAt
        cover {
          url_512
          url_1536
          url_256
        }
      }
    }
  }
`;

export const SONG_ALBUMS = gql`
  query Songs($skip: Int, $take: Int) {
    musics(skip: $skip, take: $take) {
      albums {
        name
        id
        createdAt
        content
        cover {
          url_512
          url_256
          url_1536
        }
        artist {
          id
          name
        }
      }
    }
  }
`;

export const SONG_AUTHORS = gql`
  query Songs($skip: Int, $take: Int) {
    musics(skip: $skip, take: $take) {
      artists {
        name
        id
        createdAt
        content
        cover {
          url_256
          url_512
          url_1536
        }
        _count {
          songs
        }
      }
    }
  }
`;

export const AlBUM_SONGS = gql`
  query Albums($id: Int!) {
    album(id: $id) {
      id
      name
      date
      cover {
        url_512
        url_256
        url_1536
      }
      songs {
        title
        id
        artist {
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
      _count {
        songs
      }
    }
  }
`;

export const ARTIST_SONGS = gql`
  query Artist($id: Int!) {
    artist(id: $id) {
      id
      name
      date
      cover {
        url_512
        url_256
        url_1536
      }
      songs {
        title
        id
        artist {
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
      _count {
        songs
      }
    }
  }
`;

export const PLAYLIST_SONGS = gql`
  query Playlist($id: Int!) {
    playlist(id: $id) {
      id
      name
      cover {
        url_512
        url_256
        url_1536
      }
      songs {
        song {
          title
          id
          artist {
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
      _count {
        songs
      }
    }
  }
`;
