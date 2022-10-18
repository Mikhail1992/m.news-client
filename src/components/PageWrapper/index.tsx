import { ReactNode } from 'react';
import Snackbar from '../Snackbar';
import Container, { IContainer } from '../Container';
import Loader from '../Loader';
import classes from './index.module.css';

interface IProps {
  children?: ReactNode | ReactNode[] | null;
  title?: string;
  maxWidth?: IContainer['maxWidth'];
  isLoading?: boolean;
}

export function PageWrapper({ children, title = '', isLoading = false, maxWidth = 'xl' }: IProps) {
  if (isLoading) {
    return (
      <div className={classes.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={maxWidth}>
        {!!title && <h1 className={classes.title}>{title}</h1>}
        {children}
      </Container>
      <Snackbar />
    </div>
  );
}
