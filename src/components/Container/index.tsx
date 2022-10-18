import { ReactNode } from 'react';
import classes from './index.module.css';
import cn from 'classnames';

export interface IContainer {
  children: ReactNode;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

function Container({ children, maxWidth = 'md' }: IContainer) {
  return <div className={cn(classes.container, classes[maxWidth])}>{children}</div>;
}

export default Container;
