import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { loginHelper } from '../helper/login/login-helper';

export const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      (async () => {
        try {
          const { data } = await axios.post(
            'https://api-transferencias.onrender.com/token',
            {
              token: localToken,
            }
          );
          const userData = {
            username: data.user.username,
            balance: Number(data.balance).toFixed(2),
            token: localToken,
          };
          setUser(userData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setUser(null);
        }
      })();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        setUser,
        loginHelper,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
