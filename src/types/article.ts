import { ICategory } from './category';
import { IUser } from './user';

export interface IArticle {
  id: number;
  title: string;
  url: string;
  spoiler?: string;
  coverImage?: string;
  picture?: string;
  content: string;
  userId: number;
  views: number;
  user?: IUser;
  categoryId: number;
  category?: ICategory;
  createdAt: string;
  updatedAt: string;
  published?: boolean;
  _count?: { comments: number };
}
