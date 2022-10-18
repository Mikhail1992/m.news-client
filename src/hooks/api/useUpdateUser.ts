import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { Roles } from '../../types/user';

interface IParam {
  userId: number;
  role: Roles;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, IParam>(
    ({ userId, role }) => QueryHandler.updateUser(userId, role),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    },
  );

  return mutation;
};
