'use client';
import { createContext, useCallback, useEffect, useState } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'eapp_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const persist = (u) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };

  const login = useCallback(async (email, password) => {
    const data = await authService.login({ email, password });
    persist(data);
    return data;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const data = await authService.signup({ name, email, password });
    persist(data);
    return data;
  }, []);

  const logout = useCallback(() => persist(null), []);

  return (
    <AuthContext.Provider
      value={{ user, ready, isAdmin: !!user?.isAdmin, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
