import {IBroadcast} from '../../models/Broadcast';

export interface IBroadcastState {
  data: IBroadcast[];
}

export interface IGetBroadcastArg {
  skip?: number;
  take?: number;
  where?: {
    date?: string;
    name?: boolean;
    content?: string;
  };
  search?: string;
  cursor?: {
    id: number;
  };
  orderBy?: {
    date?: 'asc' | 'desc';
    name?: 'asc' | 'desc';
  };
}
