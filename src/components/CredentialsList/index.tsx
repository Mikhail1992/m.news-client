import { Fragment } from 'react';
import { IUser, Roles } from '../../types/user';
import Divider from '../Divider';
import CredentialsListItem from './CredentialsListItem';

interface IProps {
  users: IUser[];
  updateUserRole: ({ userId, role }: { userId: number; role: Roles }) => void;
}

const CredentialsList = ({ users, updateUserRole }: IProps) => {
  return (
    <>
      {users.map((user) => (
        <Fragment key={user.id}>
          <CredentialsListItem updateUserRole={updateUserRole} user={user} />
          <Divider />
        </Fragment>
      ))}
    </>
  );
};

export default CredentialsList;
