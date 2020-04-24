import React, { createContext, useContext, useState, useEffect } from 'react';

import { signIn as auth } from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  loading: boolean;
  signed: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@r-auth:user');
    const storagedToken = localStorage.getItem('@r-auth:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.authorization = `Barear ${storagedToken}`;
    }

    setLoading(false);
  }, []);

  async function signIn() {
    const response = await auth();

    setUser(response.user);
    api.defaults.headers.authorization = `Barear ${response.token}`;

    localStorage.setItem('@r-auth:user', JSON.stringify(response.user));
    localStorage.setItem('@r-auth:token', response.token);
  }

  function signOut() {
    setUser(null);
    api.defaults.headers.authorization = null;
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{ loading, signed: !!user, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
