
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { GlassMorphicCard } from '../common/GlassMorphicCard';

export const ResetPasswordForm: React.FC = () => {
  const { requestPasswordReset, resetPassword, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (token) {
      // Reset password with token
      if (password !== passwordConfirm) {
        setErrorMessage("Passwords don't match");
        return;
      }

      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters");
        return;
      }

      await resetPassword(token, password);
    } else {
      // Request password reset
      await requestPasswordReset(email);
    }
  };

  return (
    <GlassMorphicCard className="w-full max-w-md mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        {token ? (
          // Reset password form
          <>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="focus:ring-2 focus:ring-ring pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm New Password</Label>
              <Input
                id="passwordConfirm"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                autoComplete="new-password"
                className="focus:ring-2 focus:ring-ring"
              />
            </div>
          </>
        ) : (
          // Request reset form
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="focus:ring-2 focus:ring-ring"
            />
          </div>
        )}

        {errorMessage && (
          <div className="text-destructive text-sm">{errorMessage}</div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {token ? 'Resetting password...' : 'Sending reset link...'}
            </>
          ) : (
            token ? 'Reset Password' : 'Send Reset Link'
          )}
        </Button>

        <div className="text-center text-sm">
          <Link to="/login" className="text-primary hover:underline font-medium">
            Back to sign in
          </Link>
        </div>
      </form>
    </GlassMorphicCard>
  );
};
