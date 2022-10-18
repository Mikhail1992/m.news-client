import { useState } from 'react';
import { IUser, Roles } from '../../../types/user';
import Button from '../../Button';
import ConfirmDialog from '../../ConfirmDialog';
import Grid from '../../Grid';
import Select from '../../Select';
import Avatar from '../../UserMenu/Avatar';
import classes from './index.module.css';

interface IProps {
  user: IUser;
  updateUserRole: ({ userId, role }: { userId: number; role: Roles }) => void;
}

const CredentialsListItem = ({ user, updateUserRole }: IProps) => {
  const [userRole, setUserRole] = useState<Roles>(user.role);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleConfirm = () => {
    updateUserRole({ userId: user.id, role: userRole || user.role });
  };

  const roles = [Roles.ADMIN, Roles.MANAGER, Roles.USER];

  return (
    <>
      <Grid type="container" key={user.id} alignItems="center">
        <Grid type="item" xs={12} md={5}>
          <div className={classes.user}>
            <div className={classes.avatar}>
              <Avatar />
            </div>
            Email: {user.email}
          </div>
        </Grid>
        <Grid type="item" xs={12} md={4}>
          <div className={classes.select}>
            <Select
              label="User role"
              options={roles.map((role) => ({
                label: role,
                value: role,
              }))}
              onChange={(e) => setUserRole(e.target.value as Roles)}
              value={userRole || user.role}
            />
          </div>
        </Grid>
        <Grid type="item" xs={12} md={3}>
          <div className={classes.button}>
            <Button disabled={userRole === user.role} onClick={() => setIsOpenDialog(true)}>
              Update
            </Button>
          </div>
        </Grid>
      </Grid>
      <ConfirmDialog
        open={isOpenDialog}
        onClose={() => {
          setIsOpenDialog(false);
          setUserRole(user.role);
        }}
        title="Change credentials"
        content={`Are you sure you want to change this role?`}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default CredentialsListItem;
