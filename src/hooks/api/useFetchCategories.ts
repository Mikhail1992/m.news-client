import { useQuery } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { ICategory } from '../../types/category';

export const useFetchCategories = () => {
  const query = useQuery<ICategory[], Error>(['categories'], () => QueryHandler.fetchCategories(), {
    initialData: [],
  });

  return query;
};
