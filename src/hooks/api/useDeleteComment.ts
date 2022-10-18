import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryHandler from '../../api';
import useStore from '../useStore';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useStore();

  const mutation = useMutation<void, Error, number>(
    (commentId) => QueryHandler.deleteComment(commentId),
    {
      onSuccess: () => {
        setMessage('Comment removed successfully', 'success');
        queryClient.invalidateQueries(['draftComments']);
      },
      onError: (err) => {
        setMessage(err.message, 'error');
      },
    },
  );

  return mutation;
};
