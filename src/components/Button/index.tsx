import * as React from 'react';
import cn from 'classnames';
import classes from './index.module.css';

interface IBaseProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'contained' | 'secondary';
  fullWidth?: boolean;
}

interface IButtonProps extends IBaseProps {
  component?: 'button';
}

interface ILabelProps extends IBaseProps {
  component?: 'label';
  htmlFor?: string;
}

type IProps = IButtonProps | ILabelProps;

function Button(props: IProps) {
  const { children, size = 'medium', variant = 'contained', fullWidth = false } = props;

  const classNames = cn(classes.button, classes[size], classes[variant], {
    [classes.fullWidth]: !!fullWidth,
  });
  if (props.component === 'label') {
    return (
      <label role={props?.role} htmlFor={props?.htmlFor} className={classNames}>
        {children}
      </label>
    );
  }
  const { type = 'button', disabled = false } = props;

  return (
    <button
      role={props?.role}
      type={type}
      disabled={disabled}
      className={classNames}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}

export default Button;
