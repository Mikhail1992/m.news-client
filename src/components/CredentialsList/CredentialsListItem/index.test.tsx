import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUsers } from '../../../tests/mockData/mockUsers';
import CredentialsListItem from '.';

describe('CredentialsList', () => {
  it('should call updateUserRole if we confirm', async () => {
    const updateUserRole = jest.fn();
    render(<CredentialsListItem user={mockUsers[0]} updateUserRole={updateUserRole} />);
    const select = screen.getByText(/Admin/i);
    userEvent.click(select);

    const managerOption = screen.getByText(/Manager/i);
    userEvent.click(managerOption);

    const updateButton = screen.getByText(/Update/i);
    userEvent.click(updateButton);

    const confirmButton = await screen.findByRole('button', { name: /Confirm/i });
    userEvent.click(confirmButton);

    expect(updateUserRole).toBeCalledWith({ userId: mockUsers[0].id, role: 'MANAGER' });
    expect(updateUserRole).toBeCalledTimes(1);
  });

  it('should not call updateUserRole if we click outside', async () => {
    const updateUserRole = jest.fn();
    render(<CredentialsListItem user={mockUsers[0]} updateUserRole={updateUserRole} />);
    const select = screen.getByText(/Admin/i);
    userEvent.click(select);

    const managerOption = screen.getByText(/Manager/i);
    userEvent.click(managerOption);

    userEvent.click(document.body);
    expect(updateUserRole).toBeCalledTimes(0);
  });
});
