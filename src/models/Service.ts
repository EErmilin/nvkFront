export interface IService {
  id: number;
  name: string;
  content?: string;
  price: number;
  url: string;
  link_text: string;
  images: IImage[];
}

export interface IServicePreview {
  id: number;
  name: string;
  preview: string;
  createdAt: string;
  price: number;
}

interface IImage {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  url?: string;
  url_64?: string;
  url_128?: string;
  url_256?: string;
  url_512?: string;
  url_1536?: string;
  key?: string;
  date?: string;
}

export interface ICoupon {
  id: number;
  name: string;
  content?: string;
  price: number;
  url: string;
  link_text: string;
  images: IImage;
}

export interface ICouponPreview {
  id: number;
  name: string;
  preview: string;
  createdAt: string;
  price: number;
}

export interface IAds {
  id: number;
  name: string;
  content?: string;
  price: number;
  url: string;
  link_text: string;
  images: IImage;
}

export interface IAdsPreview {
  id: number;
  name: string;
  preview: string;
  createdAt: string;
  price: number;
}
