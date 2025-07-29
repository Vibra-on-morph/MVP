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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (authType === 'wallet') {
        // Mock wallet connection
        await loginWithWallet('0x1234567890abcdef1234567890abcdef12345678');
      } else {
        if (mode === 'login') {
          await login(formData.email, formData.password);
        } else {
          await register(formData.email, formData.password, formData.username);
        }
      }
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    setError('');
    try {
      // Mock wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      await loginWithWallet('0x1234567890abcdef1234567890abcdef12345678');
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Wallet connection failed');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-8 w-full max-w-md relative neon-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
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
            onClick={() => {
              setAuthType('email');
              clearError();
            }}
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
            onClick={() => {
              setAuthType('wallet');
              clearError();
            }}
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
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Wallet className="w-4 h-4 mr-2" />
              )}
              Connect MetaMask
            </Button>
            
            <Button
              onClick={connectWallet}
              variant="outline"
              className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
              disabled={loading}
            >
              <Wallet className="w-4 h-4 mr-2" />
              WalletConnect
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    clearError();
                  }}
                  className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                  required
                />
              </div>
            )}
            
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  clearError();
                }}
                className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                required
              />
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  clearError();
                }}
                className="bg-secondary border-secondary-foreground/20 focus:border-purple-400 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              clearError();
            }}
            className="text-purple-400 hover:text-purple-300 text-sm"
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