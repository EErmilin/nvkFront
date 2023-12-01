import { IAuthorData } from '../../models/Author';
import {IBroadcast} from '../../models/Broadcast';
import {
  IAlbum,
  IArtist,
  IPlaylist,
  ISong,
  IPodcastData,
} from '../../models/Music';
import { IPost } from '../../models/Post';

export interface IScreenState {
  broadcasts: IBroadcast[];
  authorData?: IAuthorData;
  authorPosts: IPost[];
  musics: {
    albums: IAlbum[] | null;
    playlists: IPlaylist[] | null;
    artists: IArtist[] | null;
    songs: ISong[] | null;
  } | null;
  podcasts: IPodcastData[];
}
