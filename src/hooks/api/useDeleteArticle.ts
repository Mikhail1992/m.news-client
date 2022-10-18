import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryHandler from '../../api';
import useStore from '../useStore';

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useStore();

  const mutation = useMutation<void, Error, number>(
    (articleId) => QueryHandler.deleteArticle(articleId),
    {
      onSuccess: () => {
        setMessage('Article removed successfully', 'success');
        queryClient.invalidateQueries(['draftArticles']);
        queryClient.invalidateQueries(['popularArticles']);
        queryClient.invalidateQueries(['allArticles']);
        queryClient.invalidateQueries(['detailedArticle']);
      },
      onError: (err) => {
        setMessage(err.message, 'error');
      },
    },
  );

  return mutation;
};
