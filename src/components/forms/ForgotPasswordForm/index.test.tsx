import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPasswordForm from '.';

const mockForgotPassword = jest.fn((email: string): void => {
  Promise.resolve(email);
});

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    render(<ForgotPasswordForm forgotPassword={mockForgotPassword} />);
  });

  it('should not display error when value is valid', async () => {
    const emailInput = screen.getByRole('email');
    const button = screen.getByRole('button', { name: /Send/i });

    userEvent.type(emailInput, 'test@mail.com');
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(screen.queryAllByRole('alert')).toHaveLength(0);
    expect(button).toBeEnabled();
    await waitFor(() => expect(mockForgotPassword).toBeCalledWith('test@mail.com'));
    expect(mockForgotPassword).toBeCalledTimes(1);
  });

  it('should display required error when value is empty', async () => {
    const button = screen.getByRole('button', { name: /Send/i });

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(await screen.findByText(/email is a required field/i)).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(mockForgotPassword).not.toBeCalled();
  });

  it('should display matching error when email is invalid', async () => {
    const emailInput = screen.getByRole('email');
    const button = screen.getByRole('button', { name: /Send/i });

    userEvent.type(emailInput, 'test');
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(await screen.findByText(/email must be a valid email/i)).toBeInTheDocument();
    expect(emailInput).toHaveValue('test');
    expect(button).toBeDisabled();
    expect(mockForgotPassword).not.toBeCalled();
  });
});
