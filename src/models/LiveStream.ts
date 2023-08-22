import {IHlsBroadcast} from './Broadcast';
import {IProgram} from './Program';

export interface ILiveProgram {
  startTime: string;
  name: string;
  id: number;
  entTime: string;
  date: string;
}

export interface ILive {
  url: string;
  programs: IProgram[];
  name: string;
  id: number;
  cover: string;
  media?: {
    hls: IHlsBroadcast[];
  };
}
