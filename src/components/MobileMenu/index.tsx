import * as React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Transition } from 'react-transition-group';

import { PAGES } from '../../constants';
import Divider from '../Divider';
import useAuth from '../../hooks/useAuth';
import classes from './index.module.css';
import SvgIcon from '../SvgIcon';
import MenuItem from './MenuItem';
import { isAdmin, isManager } from '../../utilities';

const MobileMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const nodeRef = React.useRef(null);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setOpen(open);

    document.body.style.overflow = '';
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    if (open) {
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <div>
      <button className={classes.iconButton} onClick={toggleDrawer(true)}>
        <SvgIcon size={18} icon="mobile-menu" />
      </button>

      <Transition addEndListener={() => {}} nodeRef={nodeRef} in={open}>
        {(state) => (
          <>
            <div
              ref={nodeRef}
              className={classes[`${state}Layout`]}
              onClick={toggleDrawer(false)}
            />
            <div
              onClick={toggleDrawer(false)}
              className={cn(classes.asideMenu, classes[`${state}AsideMenu`])}
            >
              <button className={classes.closeButton}>
                <SvgIcon icon="cancel" />
              </button>
              <ul className={classes.list}>
                <MenuItem key="all" link="/" label="All" />

                {PAGES.map((page) => (
                  <MenuItem key={page.url} link={`category${page.url}`} label={page.label} />
                ))}
              </ul>

              <Divider marginTop={4} marginBottom={4} />
              {user ? (
                <>
                  <ul className={classes.list}>
                    {(isAdmin(user) || isManager(user)) && (
                      <>
                        <MenuItem
                          key="create-article"
                          link="/create-article"
                          label="Create New Article"
                        />
                        <MenuItem
                          key="create-category"
                          link="/create-category"
                          label="Create New Category"
                        />
                        {isAdmin(user) && (
                          <MenuItem key="credentials" link="/credentials" label="Credentials" />
                        )}
                        <MenuItem
                          key="draft-articles"
                          link="/draft-articles"
                          label="Unpublished Articles"
                        />
                        <MenuItem
                          key="draft-comments"
                          link="/draft-comments"
                          label="Unpublished Comments"
                        />
                      </>
                    )}
                  </ul>

                  <ul className={classes.list}>
                    <MenuItem link="/restore-password" label="Restore password" />
                    <Divider marginTop={4} marginBottom={4} />
                    <li>
                      <NavLink className={classes.authLink} onClick={logout} to="/">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </>
              ) : (
                <ul className={classes.list}>
                  <MenuItem link="/sign-in" label="Login" />
                  <MenuItem link="/sign-up" label="Register" />
                </ul>
              )}
            </div>
          </>
        )}
      </Transition>
    </div>
  );
};

export default MobileMenu;
