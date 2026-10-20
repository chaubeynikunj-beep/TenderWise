import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string) => Promise<boolean>;
  register: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: 'user' | 'admin') => Promise<void>;
  unlockArticle: (slug: string) => Promise<{ success: boolean; message?: string; alreadyUnlocked?: boolean }>;
  toggleSavedArticle: (slug: string) => Promise<void>;
  toggleSavedTender: (tenderId: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('tw_auth_token') || 'token_demo_user';
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async (authToken: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        // If demo token failed, fallback to login
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to fetch auth profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('tw_auth_token', data.token);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('tw_auth_token', data.token);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const logout = () => {
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('tw_auth_token');
  };

  const switchDemoRole = async (role: 'user' | 'admin') => {
    const demoToken = role === 'admin' ? 'token_demo_admin' : 'token_demo_user';
    setToken(demoToken);
    localStorage.setItem('tw_auth_token', demoToken);
    await fetchProfile(demoToken);
  };

  const unlockArticle = async (_slug: string) => {
    return { success: true, alreadyUnlocked: true };
  };

  const toggleSavedArticle = async (slug: string) => {
    if (!token) return;
    try {
      const res = await fetch('/api/saved/article/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ slug })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(prev => prev ? { ...prev, savedArticleSlugs: data.savedArticleSlugs } : null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSavedTender = async (tenderId: string) => {
    if (!token) return;
    try {
      const res = await fetch('/api/saved/tender/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tenderId })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(prev => prev ? { ...prev, savedTenderIds: data.savedTenderIds } : null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const refreshUser = async () => {
    if (token) {
      await fetchProfile(token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        switchDemoRole,
        unlockArticle,
        toggleSavedArticle,
        toggleSavedTender,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
