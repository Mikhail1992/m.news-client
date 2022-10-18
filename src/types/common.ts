import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';

export interface IFetchingListData<T> {
  limit: number;
  offset: number;
  count: number;
  data: T[];
}

export interface IPageParam {
  offset: number;
  limit: number;
}

export type FetchNextPage<T> = (
  options?: FetchNextPageOptions,
) => Promise<InfiniteQueryObserverResult<IFetchingListData<T>, Error>>;
