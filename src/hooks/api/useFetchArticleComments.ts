import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { IComment } from '../../types/comment';
import { IFetchingListData, IPageParam } from '../../types/common';

export const useFetchArticleComments = (articleId?: number) => {
  const query = useInfiniteQuery<IFetchingListData<IComment>, Error>(
    ['articleComments', articleId],
    async ({ pageParam }: QueryFunctionContext<QueryKey, IPageParam>) => {
      const result = await QueryHandler.fetchArticleComments(
        pageParam?.offset,
        pageParam?.limit,
        articleId as number,
      );
      return result;
    },
    {
      enabled: !!articleId,
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
    },
  );

  return query;
};
