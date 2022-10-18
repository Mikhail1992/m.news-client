import SvgIcon from '../../SvgIcon';
import classes from './index.module.css';

function Avatar() {
  return (
    <div className={classes.root}>
      <SvgIcon color="#fff" icon="user" />
    </div>
  );
}

export default Avatar;
