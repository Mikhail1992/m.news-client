import { ReactNode } from 'react';
import cn from 'classnames';
import classes from './index.module.css';

interface IProps {
  published: boolean;
  children: ReactNode;
}

function ArticleStatus({ published, children }: IProps) {
  return (
    <div className={classes.root}>
      <div
        className={cn(classes.status, {
          [classes.statusPublished]: published,
          [classes.statusUnpublished]: !published,
        })}
      />
      {children}
    </div>
  );
}

export default ArticleStatus;
