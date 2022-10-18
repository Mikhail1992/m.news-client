import classes from './index.module.css';
import SvgIcon, { IProps as ISvgIconProps } from '../../SvgIcon';

interface IProps {
  icon: ISvgIconProps['icon'];
  count?: number;
}

function CountBadge({ icon, count = 0 }: IProps) {
  return (
    <span className={classes.root}>
      <SvgIcon size={16} icon={icon} />
      <span className={classes.count}>{count}</span>
    </span>
  );
}

export default CountBadge;
