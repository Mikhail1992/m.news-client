import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RestorePasswordForm from '.';

const mockRestorePassword = jest.fn((password1: string, password2: string, token: string): void => {
  Promise.resolve({ password1, password2, token });
});

describe('RestorePasswordForm', () => {
  beforeEach(() => {
    render(<RestorePasswordForm restorePassword={mockRestorePassword} />, {
      wrapper: BrowserRouter,
    });
  });

  it('should not display error when value is valid', async () => {
    const password1Input = screen.getByRole(/password1/i);
    const password2Input = screen.getByRole(/password2/i);
    const button = screen.getByRole('button', { name: /restore password/i });

    userEvent.type(password1Input, 'password');
    userEvent.type(password2Input, 'password');

    expect(password1Input).toHaveValue('password');
    expect(password2Input).toHaveValue('password');

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findByText(/Password1 must be at least 8 chars long/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password2 should be equals Password1/i)).toBeInTheDocument();
    await waitFor(() => expect(mockRestorePassword).toBeCalledWith('password', 'password', ''));
    expect(button).toBeEnabled();
    expect(mockRestorePassword).toBeCalledTimes(1);
    expect(password1Input).toHaveValue('');
    expect(password2Input).toHaveValue('');
  });

  it('should display required error when input values is empty', async () => {
    const button = screen.getByRole('button', { name: /restore password/i });

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(await screen.findByText(/password1 is a required field/i)).toBeInTheDocument();
    expect(await screen.findByText(/password2 is a required field/i)).toBeInTheDocument();
    expect(mockRestorePassword).not.toBeCalled();
  });

  it('should display errors when password is too short', async () => {
    const password1Input = screen.getByRole(/password1/i);
    const password2Input = screen.getByRole(/password2/i);
    const button = screen.getByRole('button', { name: /restore password/i });

    userEvent.type(password1Input, 'test');
    userEvent.type(password2Input, 'test');
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(await screen.findByText(/password1 must be at least 8 chars long/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password2 should be equals Password1/i)).toBeInTheDocument();
    expect(password1Input).toHaveValue('test');
    expect(password2Input).toHaveValue('test');
    expect(button).toBeEnabled();
    expect(mockRestorePassword).not.toBeCalled();
  });

  it('should display matching error when password1 and password2 are different', async () => {
    const password1Input = screen.getByRole(/password1/i);
    const password2Input = screen.getByRole(/password2/i);
    const button = screen.getByRole('button', { name: /restore password/i });

    userEvent.type(password1Input, 'test1234');
    userEvent.type(password2Input, 'test4321');
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findByText(/Password1 must be at least 8 chars long/i)).toBeInTheDocument();
    expect(await screen.findByText(/passwords don't match/i)).toBeInTheDocument();
    expect(password1Input).toHaveValue('test1234');
    expect(password2Input).toHaveValue('test4321');
    expect(button).toBeDisabled();
    expect(mockRestorePassword).not.toBeCalled();
  });
});
