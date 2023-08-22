import {IPost} from './Post';

export interface IHashtag {
  id: number;
  name: string;
  posts?: {
    postId: number;
    post: IPost;
    hashtagId: number;
  }[];
}
