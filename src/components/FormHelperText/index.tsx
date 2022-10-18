import * as React from 'react';
import cn from 'classnames';
import SvgIcon from '../SvgIcon';
import classes from './index.module.css';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: string;
  error: boolean;
  children: React.ReactNode;
}

function FormHelperText({ children, error, ...props }: IProps) {
  return (
    <div
      className={cn(classes.root, {
        [classes.errorMsg]: error,
        [classes.infoMsg]: !error,
      })}
    >
      <SvgIcon size={13} icon={error ? 'error' : 'info'} />
      <span {...props} className={cn(classes.infoText, { [classes.textError]: error })}>
        {children}
      </span>
    </div>
  );
}

export default FormHelperText;
