import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import classes from './index.module.css';

interface IProps {
  link: string;
  label: string;
}

function MenuItem(props: IProps) {
  return (
    <li>
      <NavLink
        to={props.link}
        className={({ isActive }) =>
          cn(classes.authLink, {
            [classes.authLinkActive]: isActive,
          })
        }
      >
        {props.label}
      </NavLink>
    </li>
  );
}

export default MenuItem;
