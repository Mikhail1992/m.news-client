import SvgIcon from '../../SvgIcon';
import Avatar from '../Avatar';
import classes from './index.module.css';

interface IProps {
  open: boolean;
}

function MenuButton({ open }: IProps) {
  return (
    <button className={classes.button}>
      <span className={classes.avatar}>
        <Avatar />
      </span>
      <SvgIcon icon={open ? 'arrow-up' : 'arrow-down'} />
    </button>
  );
}

export default MenuButton;
