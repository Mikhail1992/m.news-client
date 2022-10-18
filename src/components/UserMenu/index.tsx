import { useState } from 'react';
import cn from 'classnames';

import useAuth from '../../hooks/useAuth';
import classes from './index.module.css';
import SvgIcon from '../SvgIcon';
import Divider from '../Divider';
import MenuButton from './MenuButton';
import { isAdmin, isManager } from '../../utilities';
import MenuItem from './MenuItem';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <div className={classes.root} onClick={toggleMenu}>
      {open && <div className={classes.layout} />}
      <div className={classes.button}>
        <MenuButton open={open} />
      </div>
      {open && (
        <div className={classes.menu}>
          {(isAdmin(user) || isManager(user)) && [
            <MenuItem key="create-article" link="/create-article" label="Create New Article" />,
            <MenuItem key="create-category" link="/create-category" label="Create New Category" />,
            isAdmin(user) && <MenuItem key="credentials" link="/credentials" label="Credentials" />,
            <MenuItem key="draft-articles" link="/draft-articles" label="Unpublished Articles" />,
            <MenuItem key="draft-comments" link="/draft-comments" label="Unpublished Comments" />,
          ]}
          <MenuItem key="restore-password" link="/restore-password" label="Restore password" />

          <Divider marginBottom={0} marginTop={0} />
          <li>
            <button className={cn(classes.menuItem, classes.menuItemButton)} onClick={logout}>
              <SvgIcon icon="logout" />
              Logout
            </button>
          </li>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
