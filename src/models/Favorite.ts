import {IBroadcast} from './Broadcast';
import {ISong, ISongPodcast} from './Music';
import {IPost} from './Post';
import {IUser} from './User';

export interface IFavorite {
  user: IUser;
  song: ISong | null;
  show: IBroadcast | null;
  post: IPost | null;
  podcastEpisode: ISongPodcast | null;
  id: number;
  createdAt: string;
}

export interface IFavoriteForPost {
  user: IUser;
  song: ISong | null;
  show: IBroadcast | null;
  post: IPost | null;
  podcastEpisode: ISong | null;
  id: number;
}

export interface ICreateFavoriteInput {
  songId?: number;
  showId?: number;
  postId?: number;
  podcastEpisodeId?: number;
}
