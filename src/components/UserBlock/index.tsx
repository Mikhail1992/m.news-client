import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import classes from './index.module.css';
import UserMenu from '../UserMenu';
import Button from '../Button';

function UserBlock() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return user ? (
    <div className={classes.useMenu}>
      <UserMenu />
    </div>
  ) : (
    <>
      <div className={classes.button}>
        <Button variant="outlined" onClick={() => navigate('/sign-in')}>
          Login
        </Button>
      </div>
      <div className={classes.button}>
        <Button onClick={() => navigate('/sign-up')}>Register</Button>
      </div>
    </>
  );
}

export default UserBlock;
