import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QueryHandler from '../api';
import { ICredentials, IUser } from '../types/user';
import useStore from './useStore';

export interface AuthContextInterface {
  user?: IUser;
  loading: Boolean;
  login: (user: ICredentials) => void;
  register: (user: ICredentials) => void;
  restorePassword: (password1: string, password2: string, token: string) => void;
  forgotPassword: (email: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { messages, setMessage, clearMessages } = useStore();
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
  };

  const removeToken = () => {
    localStorage.removeItem('accessToken');
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (messages.length > 0) clearMessages();
  }, [location.pathname]);

  useEffect(() => {
    QueryHandler.fetchMe()
      .then((data) => setUser(data.user))
      .catch((_error) => console.log(_error))
      .finally(() => setLoadingInitial(false));
  }, []);

  function login(user: ICredentials) {
    setLoading(true);

    QueryHandler.login(user)
      .then((data) => {
        setUser(data.user);
        setToken(data.accessToken);
        setMessage('Authorization is successfull', 'success');
        navigate('/');
      })
      .catch((err) => setMessage(err.message, 'error'))
      .finally(() => setLoading(false));
  }

  function register(user: ICredentials) {
    setLoading(true);

    QueryHandler.register(user)
      .then(() => {
        setMessage('Registration is successfull', 'success');
        navigate('/sign-in');
      })
      .catch((err) => setMessage(err.message, 'error'))
      .finally(() => setLoading(false));
  }

  function forgotPassword(email: string) {
    setLoading(true);

    QueryHandler.forgotPassword(email)
      .then(() => {
        setMessage('Recovery link sent to email', 'success');
        navigate('/');
      })
      .catch((err) => setMessage(err.message, 'error'))
      .finally(() => setLoading(false));
  }

  function restorePassword(password1: string, password2: string, token: string) {
    setLoading(true);

    QueryHandler.restorePassword(password1, password2, token)
      .then(() => {
        setMessage('Password recovery is successfull', 'success');
        if (!user) {
          navigate('/sign-in');
        }
      })
      .catch((err) => setMessage(err.message, 'error'))
      .finally(() => setLoading(false));
  }

  function logout() {
    QueryHandler.logout().then(() => {
      setUser(undefined);
      removeToken();
    });
  }

  const memoedValue: AuthContextInterface = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      restorePassword,
      forgotPassword,
      logout,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
