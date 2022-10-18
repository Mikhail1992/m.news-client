import { useQuery } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { IArticle } from '../../types/article';
import { IFetchingListData } from '../../types/common';

export const useFetchPopularArticles = () => {
  const query = useQuery<IFetchingListData<IArticle>, Error>(
    ['popularArticles'],
    () => QueryHandler.fetchPopularArticles(),
    {
      initialData: {
        limit: 0,
        offset: 0,
        count: 0,
        data: [],
      },
    },
  );

  return query;
};
