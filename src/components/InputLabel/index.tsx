import * as React from 'react';
import cn from 'classnames';
import classes from './index.module.css';

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

function InputLabel(props: IProps) {
  return (
    <label className={cn(classes.root, { [classes.disabled]: props.disabled })} {...props}>
      {props.children}
    </label>
  );
}

export default InputLabel;
