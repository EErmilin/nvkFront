import {IPost} from './Post';

export interface IUser {
  id: number;
  firstname?: string;
  phoneVerified?: string;
  lastname?: string;
  emailVerified: string;
  email?: string;
  phone?: string;
  birthdate?: string;
  hashtags?: {
    hashtag: {
      id: number;
      name: string;
    };
  }[];
  avatar: {
    url_256: string;
    url_128: string;
    id: number;
  };
  isAuthor: boolean
  author: {
    id: number;
  };
}

export interface IBloger {
  nik: string;
  about: string;
  content: {
    photo: Array<IPost>;
    video: Array<IPost>;
    audio: Array<IPost>;
  };
  sites: Array<string>;
  vk?: string;
  telegram?: string;
  youTube?: string;
  odnoklassniki?: string;
  user?: IUser;
}
