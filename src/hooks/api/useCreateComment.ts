import { useMutation } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { IComment } from '../../types/comment';
import useStore from '../useStore';

interface IMutationParams {
  articleId: number;
  text: string;
}

export const useCreateComment = () => {
  const { setMessage } = useStore();

  const mutation = useMutation<IComment, Error, IMutationParams>(
    ({ articleId, text }) => QueryHandler.createComment(articleId, text),
    {
      onSuccess: () => setMessage('After moderation your comment will be available.', 'success'),
      onError: (err) => setMessage(err.message, 'error'),
    },
  );

  return mutation;
};
