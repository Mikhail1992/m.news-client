import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import QueryHandler from '../../api';
import { IArticle } from '../../types/article';
import { IFetchingListData, IPageParam } from '../../types/common';

export const useFetchArticlesByCategoryUrl = (categoryUrl?: string) => {
  const navigate = useNavigate();

  const query = useInfiniteQuery<IFetchingListData<IArticle>, Error>(
    ['articlesByCategoryUrl', categoryUrl],
    async ({ pageParam }: QueryFunctionContext<QueryKey, IPageParam>) => {
      return QueryHandler.fetchArticlesByCategoryUrl(
        categoryUrl || '',
        pageParam?.offset,
        pageParam?.limit,
      );
    },
    {
      getNextPageParam: ({ offset, limit, count }) => {
        const newOffset = offset + limit;

        if (newOffset > count) {
          return;
        }

        return {
          offset: newOffset,
          limit,
        };
      },
      initialData: {
        pageParams: [],
        pages: [{ data: [], limit: 0, offset: 0, count: 0 }],
      },
      onError() {
        navigate('/404');
      },
    },
  );

  return { ...query, data: query.data as InfiniteData<IFetchingListData<IArticle>> };
};
