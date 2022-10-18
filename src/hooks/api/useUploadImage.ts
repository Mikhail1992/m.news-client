import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryHandler from '../../api';

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Record<string, string>, Error, FormData>(
    (images) => QueryHandler.uploadImage(images),
    {
      onSuccess: async (result) => {
        queryClient.setQueryData(['images'], () => result);
      },
    },
  );

  return mutation;
};
