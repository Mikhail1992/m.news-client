import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCreateCategory } from '../../../hooks/api/useCreateCategory';
import CreateCategoryForm from './';

jest.mock('../../../hooks/api/useCreateCategory', () => ({
  useCreateCategory: jest.fn(),
}));

describe('CreateCategoryForm', () => {
  it('should not display error when value is valid', async () => {
    const mutateAsync = jest.fn();
    (useCreateCategory as jest.Mock).mockReturnValue({ mutateAsync });
    render(<CreateCategoryForm />);

    const titleInput = screen.getByRole('title');
    const urlInput = screen.getByRole('url');
    const button = screen.getByRole('button', { name: /Save Category/i });

    userEvent.type(titleInput, 'test title');
    userEvent.type(urlInput, 'test-url');

    expect(button).toBeEnabled();

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(screen.queryAllByRole('alert')).toHaveLength(1);
    expect(await screen.findByText(/Title must start with capital letter/i)).toBeInTheDocument();
    expect(mutateAsync).toBeCalledWith({ title: 'test title', url: 'test-url' });
    expect(mutateAsync).toBeCalledTimes(1);
    expect(titleInput).toHaveValue('');
    expect(urlInput).toHaveValue('');
  });

  it('should display required error when input values is empty', async () => {
    const mutateAsync = jest.fn();
    (useCreateCategory as jest.Mock).mockReturnValue({ mutateAsync });
    render(<CreateCategoryForm />);

    const button = screen.getByRole('button', { name: /Save Category/i });
    expect(button).toBeEnabled();

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(screen.queryAllByRole('alert')).toHaveLength(2);
    expect(await screen.findByText(/title is a required field/i)).toBeInTheDocument();
    expect(await screen.findByText(/url is a required field/i)).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
