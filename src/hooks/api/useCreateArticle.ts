import { useMutation } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { ICreatedArticle } from '../../types/form';
import useStore from '../useStore';

export const useCreateArticle = () => {
  const { setMessage } = useStore();

  const mutation = useMutation<void, Error, ICreatedArticle>(
    (data) => QueryHandler.createArticle(data),
    {
      onSuccess: () => {
        setMessage('Article created successfully', 'success');
      },
      onError: (err) => {
        setMessage(err.message, 'error');
      },
    },
  );

  return mutation;
};
