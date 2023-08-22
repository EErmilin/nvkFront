import {IMusicData} from '../../models/Music';

export interface IMusicState {
  data: IMusicData;
}

export interface IGetMusicArg {
  skip?: number;
  take?: number;
}
