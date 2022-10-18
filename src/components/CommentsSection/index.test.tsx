import { screen } from '@testing-library/react';
import { mockCommentsPages } from '../../tests/mockData/mockCommentPages';
import CommentsSection from './';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderWithRouter } from '../../tests/utils/renderWithRouter';

describe('CommentsSection', () => {
  it('logged users can add comments', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    renderWithRouter(
      <QueryClientProvider client={queryClient}>
        <CommentsSection
          comments={mockCommentsPages}
          fetchNextPage={jest.fn()}
          hasNextPage={false}
          articleId={4}
          isLoggedIn={true}
        />
      </QueryClientProvider>,
      { route: '/test-page' },
    );

    expect(await screen.findByRole('button', { name: /Send/i })).toBeInTheDocument();
  });
  it('unlogged users can not add comments, and see `Sing In` or `Sing Up`', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    renderWithRouter(
      <QueryClientProvider client={queryClient}>
        <CommentsSection
          comments={mockCommentsPages}
          fetchNextPage={jest.fn()}
          hasNextPage={false}
          articleId={4}
          isLoggedIn={false}
        />
      </QueryClientProvider>,
      { route: '/test-page' },
    );

    expect(screen.queryByRole('button', { name: /Send/i })).not.toBeInTheDocument();
    expect(
      screen.getByText(/Only authorized users can leave comments. Please/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  });
});
