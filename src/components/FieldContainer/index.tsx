import { ReactNode } from 'react';
import classes from './index.module.css';

interface IFieldContaner {
  children: ReactNode;
}

function FieldContainer({ children }: IFieldContaner) {
  return <div className={classes.field}>{children}</div>;
}

export default FieldContainer;
