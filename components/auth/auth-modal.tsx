'use client';

import { useState } from 'react';
import { X, Mail, Wallet, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [authType, setAuthType] = useState<'email' | 'wallet'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const { login, loginWithWallet, register } = useAuth();

  const validateForm = () => {
    if (authType === 'email') {
      if (!formData.email.trim()) {
        setError('Email is required');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
      if (!formData.password.trim()) {
        setError('Password is required');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (mode === 'register' && !formData.username.trim()) {
        setError('Username is required');
        return false;
      }
      if (mode === 'register' && formData.username.length < 3) {
        setError('Username must be at least 3 characters');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (authType === 'wallet') {
        // Mock wallet connection with better error handling
        await new Promise(resolve => setTimeout(resolve, 1000));
        await loginWithWallet('0x1234567890abcdef1234567890abcdef12345678');
      } else {
        if (mode === 'login') {
          await login(formData.email.trim(), formData.password);
        } else {
          await register(formData.email.trim(), formData.password, formData.username.trim());
        }
      }
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    setError('');
    try {
      // Mock wallet connection with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      await loginWithWallet('0x1234567890abcdef1234567890abcdef12345678');
      onClose();
    } catch (error) {
      console.error('Wallet connection error:', error);
      setError(error instanceof Error ? error.message : 'Wallet connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', username: '' });
    setError('');
    setShowPassword(false);
  };

  const handleModeChange = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  const handleAuthTypeChange = (type: 'email' | 'wallet') => {
    setAuthType(type);
    resetForm();
  };

  // Handle escape key to close modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-card rounded-2xl p-8 w-full max-w-md relative neon-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join Vibra'}
          </h2>
          <p className="text-muted-foreground">
            {mode === 'login' 
              ? 'Sign in to start earning crypto rewards' 
              : 'Create your account and start earning'
            }
          </p>
        </div>

        {/* Auth Type Selector */}
        <div className="flex rounded-lg bg-secondary p-1 mb-6">
          <button
            type="button"
            onClick={() => handleAuthTypeChange('email')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
              authType === 'email' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
          <button
            type="button"
            onClick={() => handleAuthTypeChange('wallet')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
              authType === 'wallet' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Wallet className="w-4 h-4" />
            Wallet
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {authType === 'wallet' ? (
          <div className="space-y-4">
            <Button
              onClick={connectWallet}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Wallet className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Connecting...' : 'Connect MetaMask'}
            </Button>
            
            <Button
              onClick={connectWallet}
              variant="outline"
              className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed py-3"
              disabled={loading}
            >
              <Wallet className="w-4 h-4 mr-2" />
              WalletConnect
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-white">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    clearError();
                  }}
                  className="w-full h-12 px-4 bg-purple-900/30 border-2 border-purple-400 text-white placeholder:text-purple-200 focus:border-purple-300 focus:bg-purple-800/40 transition-all duration-200 rounded-lg shadow-lg"
                  required
                  minLength={3}
                  maxLength={20}
                  disabled={loading}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  clearError();
                }}
                className="w-full h-12 px-4 bg-purple-900/30 border-2 border-purple-400 text-white placeholder:text-purple-200 focus:border-purple-300 focus:bg-purple-800/40 transition-all duration-200 rounded-lg shadow-lg"
                required
                disabled={loading}
              />
            </div>
            
            <div className="relative space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  clearError();
                }}
                className="w-full h-12 px-4 pr-12 bg-purple-900/30 border-2 border-purple-400 text-white placeholder:text-purple-200 focus:border-purple-300 focus:bg-purple-800/40 transition-all duration-200 rounded-lg shadow-lg"
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-purple-300 hover:text-white transition-colors"
                disabled={loading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white font-medium rounded-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              {loading 
                ? (mode === 'login' ? 'Signing In...' : 'Creating Account...') 
                : (mode === 'login' ? 'Sign In' : 'Create Account')
              }
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleModeChange}
            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
            disabled={loading}
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'
            }
          </button>
        </div>
      </div>
    </div>
  );
}