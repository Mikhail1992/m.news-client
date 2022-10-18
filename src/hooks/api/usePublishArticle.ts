import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { IArticle } from '../../types/article';
import useStore from '../useStore';

interface IParam {
  articleId: number;
  published: boolean;
}

export const usePublishArticle = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useStore();

  const mutation = useMutation<IArticle, Error, IParam>(
    async ({ articleId, published }) => QueryHandler.publishArticle(articleId, published),
    {
      onSuccess: ({ published }) => {
        setMessage(`Article ${published ? 'published' : 'unpublished'} successfully`, 'success');
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
