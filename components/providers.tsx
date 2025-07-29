'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '@/types';
import { mockUsers } from '@/data/mock-data';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('vibra_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - find user by email
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('vibra_user', JSON.stringify(foundUser));
      return foundUser;
    }
    throw new Error('Invalid credentials');
  };

  const loginWithWallet = async (address: string) => {
    // Mock wallet login
    const walletUser = mockUsers.find(u => u.walletAddress === address) || {
      ...mockUsers[0],
      id: 'wallet-' + Date.now(),
      walletAddress: address,
      email: '',
    };
    setUser(walletUser);
    localStorage.setItem('vibra_user', JSON.stringify(walletUser));
    return walletUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vibra_user');
  };

  const register = async (email: string, password: string, username: string) => {
    // Mock registration
    const newUser: User = {
      id: 'user-' + Date.now(),
      username,
      email,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400`,
      role: 'user',
      verified: false,
      followers: 0,
      following: 0,
      totalEarned: 0,
      walletBalance: 0,
      createdAt: new Date(),
    };
    setUser(newUser);
    localStorage.setItem('vibra_user', JSON.stringify(newUser));
    return newUser;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      loginWithWallet,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a Providers component');
  }
  return context;
};