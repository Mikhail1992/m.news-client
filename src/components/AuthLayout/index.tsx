import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../Button';
import Header from '../Header';
import SvgIcon from '../SvgIcon';
import classes from './index.module.css';
import logo from './logo.svg';

function AuthLayout() {
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.leftPanel}>
        <div className={classes.button}>
          <Button size="small" onClick={() => navigate(-1)}>
            <SvgIcon size={18} icon="arrow-left" />
            BACK
          </Button>
        </div>
        <NavLink to="/" className={classes.logo}>
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>
      <div className={classes.rightPanel}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
