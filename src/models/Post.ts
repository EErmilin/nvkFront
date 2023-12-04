type PostAuthor = {
  firstname: string;
  lastname: string;
  avatar?: {
    url_128: string;
    id: number;
  };
};

export interface IPostComment {
  content: string;
  createdAt: string;
  user: PostAuthor;
}

export interface IPost {
  id: number;
  authorId: number;
  content?: string;
  preview?: string;
  title: string;
  published: boolean;
  images: IPostImage[];
  author: PostAuthor;
  views: number;
  createdAt: string;
  hashtags?: IHashtagPost[];
  media?: {
    id: number;
    name: string;
    indexM3u8Url?: string;
    createdAt: string;
    hls?: {
      createdAt: string;
      id: number;
      m3u8Url: string;
      name?: string;
    }[];
    covers?: {
      url_512: string;
      url_256: string;
      url_1536: string;
    }[];
  };
  totalComments?: number;
  postComments?: IPostComment[];
}

export interface IMediaPost {
  covers: IImagePost[];
  createdAt: string;
  hls: IHlsPost[];
  id: number;
  indexM3u8Url?: string;
  name: string;
}

export interface IImagePost {
  id: number;
  url: string;
  url_1536: string;
  url_256: string;
  url_512: string;
}

export interface IHlsPost {
  createdAt: string;
  id: number;
  m3u8Url: string;
  name?: string;
}

export interface IPostCategory {
  id: number;
  name: string;
}

export interface IPostImage {
  id: number;
  url: string;
  url_1536: string;
}

export interface IHashtagPost {
  hashtag?: {
    id: number;
    name: string;
  };
}

export interface ICreatePostArg {
  authorId: number;
  title: string;
  content?: string;
  imageIds?: number[];
  published: boolean;
}
