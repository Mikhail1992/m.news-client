import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { IArticle } from '../../types/article';
import { IUpdatedArticle } from '../../types/form';
import useStore from '../useStore';

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useStore();

  const mutation = useMutation<IArticle, Error, IUpdatedArticle>(
    (updateArticleData) => QueryHandler.updateArticle(updateArticleData),
    {
      onSuccess: () => {
        setMessage('Article updated successfully', 'success');
        queryClient.invalidateQueries(['detailedArticle']);
        queryClient.invalidateQueries(['draftArticles']);
      },
      onError: (err) => {
        setMessage(err.message, 'error');
      },
    },
  );

  return mutation;
};
