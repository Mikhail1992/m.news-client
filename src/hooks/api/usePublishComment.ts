import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { IComment } from '../../types/comment';
import useStore from '../useStore';

export const usePublishComment = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useStore();

  const mutation = useMutation<IComment, Error, number>(
    async (commentId) => QueryHandler.publishComment(commentId),
    {
      onSuccess: () => {
        setMessage('Comment published successfully', 'success');
        queryClient.invalidateQueries(['draftComments']);
      },
      onError: (err) => {
        setMessage(err.message, 'error');
      },
    },
  );

  return mutation;
};
