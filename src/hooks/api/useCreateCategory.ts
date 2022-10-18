import { useMutation } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { ICategory } from '../../types/category';
import useStore from '../useStore';

export const useCreateCategory = () => {
  const { setMessage } = useStore();

  const mutation = useMutation<ICategory, Error, Pick<ICategory, 'title' | 'url'>>(
    ({ title, url }) => QueryHandler.createCategory({ title, url }),
    {
      onSuccess: () => {
        setMessage('Category created successfully', 'success');
      },
      onError: (err) => {
        setMessage(err.message, 'error');
      },
    },
  );

  return mutation;
};
