export type ISongType =
  | 'artist'
  | 'playlist'
  | 'album'
  | 'podcast'
  | 'radio'
  | 'olonho'
  | 'fairytale';

export type IMusicAlbumID =
  | number
  | 'alltrack'
  | 'favorite'
  | 'radio'
  | 'search';

export interface IMusicData {
  _count?: number;
  albums: IAlbum[];
  artists: IArtist[];
  playlists: IPlaylist[];
  songs: ISong[];
}
export interface IMusic {
  id?: number;
  url: string | number; // Load media from the network
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
  date?: string; // RFC 3339
  artwork?: string | number | undefined; // Load artwork from the network
  duration?: number | undefined; // Duration in seconds
  type?: string;
}
export interface ISong {
  id: number;
  url: string; // Load media from the network
  title: string;
  artist?: {
    id: string;
    name?: string;
  };
  album?: string;
  genre?: string;
  date?: string; // RFC 3339
  artwork?: ISongImage; // Load artwork from the network
  createdAt?: string;
  duration?: number;
  media: {
    hls?: {
      m3u8Url: string;
    }[];
  };
}

export interface ISongPodcast {
  id: number;
  url: string; // Load media from the network
  title: string;
  podcastAlbum?: {
    id: string;
    name?: string;
  };
  genre?: string;
  date?: string; // RFC 3339
  artwork?: ISongImage; // Load artwork from the network
  createdAt?: string;
  duration?: number;
  media: {
    hls?: {
      m3u8Url: string;
    }[];
  };
}

export interface IAlbum {
  id: number | 'alltrack' | 'favorite';
  name?: string;
  content?: string;
  cover?: ISongImage;
  createdAt: string;
  artist?: {
    id: number;
    name?: string;
  };
}

export interface IArtist {
  name: string;
  id: number;
  content: string;
  cover: ISongImage;
  createdAt: string;
  _count: {
    songs: number;
  };
}

export interface IPlaylist {
  content: string;
  id: number;
  name: string;
  coverImage: ISongImage;
  createdAt: string;
}

export interface ISongImage {
  url_256: string;
  url_512: string;
  url_1536: string;
}

export interface IPodcastData {
  id: number;
  name: string;
  podcastAlbums: IAlbum[];
}
