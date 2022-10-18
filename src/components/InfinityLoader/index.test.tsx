import { Fragment } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
  mockArticlesPages,
  mockArticlesPages2,
  mockArticlesPages3,
} from '../../tests/mockData/mockArticlePages';
import Divider from '../Divider';
import Grid from '../Grid';
import Preview from '../Preview';

import InfinityLoader from './';

const renderWrapper = (ui: any, { route = '/' } = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </BrowserRouter>
      ),
    }),
  };
};

describe('InfinityLoader', () => {
  it('InfinityLoader without next page', async () => {
    renderWrapper(
      <InfinityLoader itemsPages={mockArticlesPages} fetchNextPage={jest.fn()} hasNextPage={false}>
        {({ items }) => {
          return items.map((article) => (
            <Fragment key={article.id}>
              <Grid type="item" xs={12} key={article.id}>
                <Preview article={article} type="full" showActionsPanel />
              </Grid>
              <Divider />
            </Fragment>
          ));
        }}
      </InfinityLoader>,
    );

    expect(screen.getAllByTestId('article-preview')).toHaveLength(4);
    expect(screen.queryByRole('link', { name: /LOAD MORE/i })).toBeNull();
  });
  it('InfinityLoader with next page', async () => {
    renderWrapper(
      <InfinityLoader itemsPages={mockArticlesPages2} fetchNextPage={jest.fn()} hasNextPage={true}>
        {({ items }) => {
          return items.map((article) => (
            <Fragment key={article.id}>
              <Grid type="item" xs={12} key={article.id}>
                <Preview article={article} type="full" showActionsPanel />
              </Grid>
              <Divider />
            </Fragment>
          ));
        }}
      </InfinityLoader>,
    );

    const button = screen.getByRole('button', { name: /LOAD MORE/i });
    expect(button).toBeInTheDocument();
  });

  it('InfinityLoader after fetch second page', async () => {
    renderWrapper(
      <InfinityLoader itemsPages={mockArticlesPages3} fetchNextPage={jest.fn()} hasNextPage={false}>
        {({ items }) => {
          return items.map((article) => (
            <Fragment key={article.id}>
              <Grid type="item" xs={12} key={article.id}>
                <Preview article={article} type="full" showActionsPanel />
              </Grid>
              <Divider />
            </Fragment>
          ));
        }}
      </InfinityLoader>,
    );

    expect(screen.getAllByTestId('article-preview')).toHaveLength(12);
    expect(screen.queryByRole('link', { name: /LOAD MORE/i })).toBeNull();
  });
});
