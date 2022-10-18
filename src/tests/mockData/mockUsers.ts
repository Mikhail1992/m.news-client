import { IUser, Roles } from '../../types/user';

export const mockUsers: IUser[] = [
  {
    email: 'man@man.com',
    id: 2,
    name: 'Man',
    role: Roles.ADMIN,
  },
  { email: 'user2@user.com', id: 3, name: 'User', role: Roles.MANAGER },
  { email: 'dwdw@ede.ede', id: 4, name: null, role: Roles.USER },
];
