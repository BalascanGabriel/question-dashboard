
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Redirect to dashboard if authenticated, otherwise to login
      // Use replace: true to prevent back navigation to this page
      navigate(isAuthenticated ? '/dashboard' : '/login', { replace: true });
    }
  }, [navigate, isAuthenticated, isLoading]);

  // Show nothing while redirecting
  return null;
};

export default Index;
