import { IArticle } from './article';

export interface IFormInputs {
  title: string;
  url: string;
  spoiler?: string;
  content: string;
  categoryId: number;
  coverImage?: string;
  picture?: string;
}

export interface ICreatedArticle
  extends Pick<
    IArticle,
    'categoryId' | 'content' | 'spoiler' | 'title' | 'url' | 'coverImage' | 'picture'
  > {}

export interface IUpdatedArticle extends ICreatedArticle {
  id: number;
}

export type IImage = 'picture' | 'coverImage';

export interface IUploadImages extends Pick<IFormInputs, 'coverImage' | 'picture'> {}
