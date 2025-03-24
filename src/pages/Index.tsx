
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Log the authentication state for debugging
    console.log('Index page - Auth state:', { isAuthenticated, isLoading });
    
    if (!isLoading) {
      // Add a small delay to ensure auth context is fully resolved
      setTimeout(() => {
        // Redirect to dashboard if authenticated, otherwise to login
        // Use replace: true to prevent back navigation to this page
        navigate(isAuthenticated ? '/dashboard' : '/login', { replace: true });
      }, 100);
    }
  }, [navigate, isAuthenticated, isLoading]);

  // Show loading indicator while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-xl">Redirecting...</div>
    </div>
  );
};

export default Index;
