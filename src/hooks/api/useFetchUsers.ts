import { useQuery } from '@tanstack/react-query';
import QueryHandler from '../../api';
import { IFetchingListData } from '../../types/common';
import { IUser } from '../../types/user';

export const useFetchUsers = () => {
  const query = useQuery<IFetchingListData<IUser>, Error>(
    ['users'],
    () => QueryHandler.fetchUsers(),
    {
      initialData: {
        limit: 0,
        offset: 0,
        count: 0,
        data: [],
      },
    },
  );

  return query;
};
