import { InfiniteData } from '@tanstack/react-query';
import { useFetchArticles } from '../../hooks/api/useFetchArticles';
import { useFetchPopularArticles } from '../../hooks/api/useFetchPopularArticles';
import { IArticle } from '../../types/article';
import { FetchNextPage, IFetchingListData } from '../../types/common';

interface IReturnData {
  popularArticles: IArticle[];
  articlesPages: InfiniteData<IFetchingListData<IArticle>>;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  fetchNextPage: FetchNextPage<IArticle>;
  hasNextPage?: boolean;
}

export const useFetchData = (): IReturnData => {
  const {
    data: popularArticles,
    isLoading: isLoadingPopularArticles,
    error: popularArticlesError,
    isFetching: isFetchingPopularArticles,
  } = useFetchPopularArticles();

  const {
    isLoading: isLoadingArticles,
    // use `isFetchedAfterMount` instead `isFetching`, because `isFetching` triggered on `fetchNextPage`
    isFetchedAfterMount: isNotFetchingArticles,
    error: articlesError,
    data: articlesPages,
    fetchNextPage,
    hasNextPage,
  } = useFetchArticles();

  const isLoading = [isLoadingPopularArticles, isLoadingArticles].some((isLoading) => isLoading);
  const isFetching = [isFetchingPopularArticles, !isNotFetchingArticles].some(
    (isFetching) => isFetching,
  );

  const error =
    [popularArticlesError, articlesError].find((error) => error instanceof Error) || null;

  return {
    popularArticles: popularArticles.data,
    // `@tanstack/react-query` can't resolve types when we use `useInfiniteQuery` hook even when we use `initialData`
    articlesPages: articlesPages as InfiniteData<IFetchingListData<IArticle>>,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};
