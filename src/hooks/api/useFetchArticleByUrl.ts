import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import QueryHandler from '../../api';
import useAuth from '../useAuth';
import { IArticle } from '../../types/article';
import { Roles } from '../../types/user';

export const useFetchArticleByUrl = (articleUrl?: string) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const method =
    !user || [Roles.USER].includes(user?.role)
      ? QueryHandler.fetchArticleByUrl
      : QueryHandler.fetchPrivateArticleByUrl;

  const query = useQuery<IArticle, Error>(
    ['detailedArticle', articleUrl],
    () => {
      return method(articleUrl || '');
    },
    {
      onError() {
        navigate('/404');
      },
    },
  );

  return query;
};
