import { IUser } from './user';
import { IArticle } from './article';

export interface IComment {
  id: number;
  text: string;
  published: boolean;
  articleId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: Pick<IUser, 'email' | 'id' | 'name'>;
  article?: Pick<IArticle, 'title' | 'id'>;
}
