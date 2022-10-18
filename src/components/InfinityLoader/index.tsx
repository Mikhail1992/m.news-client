import * as React from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { FetchNextPage, IFetchingListData } from '../../types/common';
import Button from '../Button';
import Grid from '../Grid';

interface IChildProps<T> {
  items: T[];
}

interface IProps<T> {
  itemsPages?: InfiniteData<IFetchingListData<T>>;
  fetchNextPage: FetchNextPage<T>;
  hasNextPage?: boolean;
  children: (props: IChildProps<T>) => React.ReactNode;
}

const InfinityLoader = <T extends unknown>({
  itemsPages,
  fetchNextPage,
  hasNextPage,
  children,
}: IProps<T>) => {
  const pages = itemsPages?.pages;

  const items = pages?.flatMap(({ data }) => data) || [];

  if (!items.length) return <div>No data</div>;

  return (
    <>
      <Grid type="container" marginBottom={3}>
        {children({ items })}
      </Grid>
      <Grid type="container" justifyContent="center" marginBottom={8} alignItems="center">
        {hasNextPage && (
          <Button variant="outlined" size="large" onClick={fetchNextPage}>
            LOAD MORE
          </Button>
        )}
      </Grid>
    </>
  );
};

export default InfinityLoader;
