export interface IBroadcast {
  content: string;
  createdAt: string;
  id: number;
  image: IImageBroadcast;
  name: string;
  seasons?: ISeasonBroadcast[];
  rayting?: number;
}

export interface IImageBroadcast {
  id: number;
  url: string;
  url_1536: string;
  url_256: string;
  url_512: string;
}

export interface ISeasonBroadcast {
  createdAt: string;
  episodes?: IEpisodeBroadcast[];
  id: number;
  name: string;
  number: number;
  showId?: number;
  updatedAt: string;
}

export interface IEpisodeBroadcast {
  createdAt: string;
  duration: number;
  id: number;
  media?: IMediaBroadcast;
  name: string;
  number: number;
  seasonId: number;
  updatedAt: string;
}

export interface IMediaBroadcast {
  covers: IImageBroadcast[];
  createdAt: string;
  hls: IHlsBroadcast[];
  id: number;
  indexM3u8Url?: string;
  name: string;
}

export interface IHlsBroadcast {
  id: number;
  m3u8Url: string;
  name?: string;
}
