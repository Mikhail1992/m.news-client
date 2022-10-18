import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { IComment } from '../../types/comment';
import { IFetchingListData, IPageParam } from '../../types/common';

export const useFetchDraftComments = () => {
  const query = useInfiniteQuery<IFetchingListData<IComment>, Error>(
    ['draftComments'],
    async ({ pageParam }: QueryFunctionContext<QueryKey, IPageParam>) => {
      const result = await QueryHandler.fetchDraftComments(pageParam?.offset, pageParam?.limit);
      return result;
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
    },
  );

  return query;
};
