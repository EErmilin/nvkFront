import {IPodcastData} from '../../models/Music';

export interface IPodcastState {
  data: IPodcastData[];
}

export interface IPodcastArg {
  skip?: number;
  take?: number;
  where?: {
    podcastAlbums?: any;
    podcastArtists?: any;
    podcastEpisodes?: any;
  };
  cursor?: {
    id: number;
  };
  orderBy?: {
    date?: 'asc' | 'desc';
    name?: 'asc' | 'desc';
  };
}
