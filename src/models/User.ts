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
}
