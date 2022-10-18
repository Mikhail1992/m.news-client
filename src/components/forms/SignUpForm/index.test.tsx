import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../../../tests/utils/renderWithRouter';
import SignUpForm, { IFormInputs } from './';

const mockRegister = jest.fn((data: IFormInputs): void => {
  Promise.resolve(data);
});

describe('SignUpForm', () => {
  beforeEach(() => {
    renderWithRouter(<SignUpForm register={mockRegister} />);
  });

  it('should not display error when value is valid', async () => {
    const emailInput = screen.getByRole('email');
    const passwordInput = screen.getByRole('password');
    const button = screen.getByRole('button', { name: /Register/i });

    userEvent.type(emailInput, 'test@mail.com');
    userEvent.type(passwordInput, 'password');
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findByText(/Password must be at least 8 chars long/i)).toBeInTheDocument();
    expect(button).toBeEnabled();
    await waitFor(() =>
      expect(mockRegister).toBeCalledWith({
        email: 'test@mail.com',
        password: 'password',
      }),
    );
    expect(mockRegister).toBeCalledTimes(1);
  });

  it('should display required error when input values is empty', async () => {
    const button = screen.getByRole('button', { name: /Register/i });

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(button).toBeDisabled();
    expect(mockRegister).not.toBeCalled();
  });

  it('should display matching error when email is invalid', async () => {
    const emailInput = screen.getByRole('email');
    const passwordInput = screen.getByRole('password');
    const button = screen.getByRole('button', { name: /Register/i });

    userEvent.type(emailInput, 'test');
    userEvent.type(passwordInput, 'password');
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(await screen.findByText(/email must be a valid email/i)).toBeInTheDocument();
    expect(emailInput).toHaveValue('test');
    expect(passwordInput).toHaveValue('password');
    expect(button).toBeDisabled();
    expect(mockRegister).not.toBeCalled();
  });

  it('should display min length error when password is invalid', async () => {
    const emailInput = screen.getByRole('email');
    const passwordInput = screen.getByRole('password');
    const button = screen.getByRole('button', { name: /Register/i });

    userEvent.type(emailInput, 'test@mail.com');
    userEvent.type(passwordInput, 'pass');
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(await screen.findByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    expect(emailInput).toHaveValue('test@mail.com');
    expect(passwordInput).toHaveValue('pass');
    expect(button).toBeDisabled();
    expect(mockRegister).not.toBeCalled();
  });
});
