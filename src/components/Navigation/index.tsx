import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import UserBlock from '../UserBlock';
import classes from './index.module.css';

interface IProps {
  navItems: Array<{ label: string; url: string }>;
}

export default function Navigation({ navItems }: IProps) {
  return (
    <div className={classes.container}>
      <div className={cn(classes.headerRight)}>
        <NavLink
          key="all"
          to="/"
          className={({ isActive }) =>
            cn(classes.authLink, {
              [classes.active]: isActive,
            })
          }
        >
          All
        </NavLink>
        {navItems.map((page) => (
          <NavLink
            key={page.url}
            to={`category${page.url}`}
            className={({ isActive }) =>
              cn(classes.authLink, {
                [classes.active]: isActive,
              })
            }
          >
            {page.label}
          </NavLink>
        ))}
      </div>
      <div className={classes.authContainer}>
        <UserBlock />
      </div>
    </div>
  );
}
