import { NavLink } from 'react-router-dom';
import { PAGES } from '../../constants';
import Container from '../Container';
import Logo from '../Logo';
import MobileMenu from '../MobileMenu';
import Navigation from '../Navigation';
import classes from './index.module.css';

function Header() {
  return (
    <div className={classes.header}>
      <Container maxWidth="xl">
        <div className={classes.container}>
          <NavLink to="/" className={classes.logo}>
            <Logo />
          </NavLink>
          <div className={classes.nav}>
            <Navigation navItems={PAGES} />
          </div>
          <div className={classes.mobileMenu}>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
