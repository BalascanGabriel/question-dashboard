
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'guest';
  subscription: {
    plan: 'free' | 'premium' | 'guest';
    questionsRemaining: number;
    expiresAt: string | null;
  };
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  continueAsGuest: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Create a guest user object
const createGuestUser = (): User => ({
  id: 'guest-' + Math.random().toString(36).substring(2, 9),
  name: 'Guest User',
  email: 'guest@example.com',
  role: 'guest',
  subscription: {
    plan: 'guest',
    questionsRemaining: 3,
    expiresAt: null,
  },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth-token');
      
      // Check if there's a guest user in localStorage
      const guestUser = localStorage.getItem('guest-user');
      
      if (token) {
        try {
          const userData = await authAPI.getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('auth-token');
          
          // If token is invalid but guest user exists, use that
          if (guestUser) {
            setUser(JSON.parse(guestUser));
          }
        }
      } else if (guestUser) {
        // Use stored guest user if no valid token
        setUser(JSON.parse(guestUser));
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token, user } = await authAPI.login(email, password);
      localStorage.setItem('auth-token', token);
      localStorage.removeItem('guest-user'); // Remove guest user if exists
      setUser(user);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Error handling is done in API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token, user } = await authAPI.register(name, email, password);
      localStorage.setItem('auth-token', token);
      localStorage.removeItem('guest-user'); // Remove guest user if exists
      setUser(user);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Error handling is done in API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('guest-user');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const continueAsGuest = () => {
    const guestUser = createGuestUser();
    localStorage.setItem('guest-user', JSON.stringify(guestUser));
    setUser(guestUser);
    navigate('/dashboard');
  };

  const requestPasswordReset = async (email: string) => {
    try {
      await authAPI.requestPasswordReset(email);
      toast.success('Password reset email sent');
      navigate('/login');
    } catch (error) {
      console.error('Password reset request failed:', error);
      // Error handling is done in API interceptor
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await authAPI.resetPassword(token, password);
      toast.success('Password reset successful. Please login with your new password.');
      navigate('/login');
    } catch (error) {
      console.error('Password reset failed:', error);
      // Error handling is done in API interceptor
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        continueAsGuest,
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
