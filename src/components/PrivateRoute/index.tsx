import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { IUser, Roles } from '../../types/user';

interface ProtectedRouteProps {
  user?: IUser;
  roles?: Roles[];
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute = ({
  children,
  user,
  roles = [],
  redirectPath = '/',
}: ProtectedRouteProps) => {
  const isAllowed = !!user && (roles.length === 0 || roles.includes(user.role));

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
