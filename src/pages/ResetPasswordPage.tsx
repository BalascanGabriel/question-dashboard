
import React from 'react';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';
import { useSearchParams } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {token ? 'Reset your password' : 'Forgot your password?'}
          </h1>
          <p className="text-muted-foreground">
            {token 
              ? 'Enter your new password below' 
              : "Enter your email and we'll send you a reset link"
            }
          </p>
        </div>
        
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
