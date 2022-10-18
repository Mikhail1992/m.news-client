import { useFetchArticleByUrl } from '../../hooks/api/useFetchArticleByUrl';
import { useFetchCategories } from '../../hooks/api/useFetchCategories';
import { IArticle } from '../../types/article';
import { ICategory } from '../../types/category';

interface IReturnData {
  article?: IArticle;
  categories: ICategory[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
}

export const useFetchData = (articleUrl?: string): IReturnData => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
    error: categoriesError,
  } = useFetchCategories();

  const {
    data: article,
    isLoading: isLoadingArticle,
    isFetching: isFetchingArticle,
    error: articleError,
  } = useFetchArticleByUrl(articleUrl);

  const isLoading = [isLoadingCategories, isLoadingArticle].some((isLoading) => isLoading);
  const isFetching = [isFetchingCategories, isFetchingArticle].some((isFetching) => isFetching);
  const error = [categoriesError, articleError].find((error) => error instanceof Error) || null;

  return {
    article,
    categories,
    isLoading,
    isFetching,
    error,
  };
};
