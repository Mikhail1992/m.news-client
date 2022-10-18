import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCreateComment } from '../../../hooks/api/useCreateComment';
import AddNewComment from '.';

jest.mock('../../../hooks/api/useCreateComment', () => ({
  useCreateComment: jest.fn(),
}));

describe('AddNewComment', () => {
  it('create new comment', async () => {
    const mutateAsync = jest.fn();
    (useCreateComment as jest.Mock).mockImplementation(() => ({ mutateAsync, isSuccess: true }));

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    render(<AddNewComment articleId={4} />, { wrapper });

    const contentInput = screen.getByTitle('comment');
    const button = screen.getByRole('button', { name: /Send/i });
    expect(button).toBeDisabled();
    userEvent.type(contentInput, 'my comment');
    expect(contentInput).toHaveValue('my comment');
    expect(button).toBeEnabled();

    await act(async () => {
      userEvent.click(button);
    });

    waitFor(() => {
      expect(mutateAsync).toBeCalledWith({ articleId: 4, text: 'my comment' });
    });
    expect(contentInput).toHaveValue('');
    expect(button).toBeDisabled();
  });
});
