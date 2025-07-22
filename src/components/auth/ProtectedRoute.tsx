
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - user:', user?.email, 'loading:', loading);
    if (!loading && !user) {
      console.log('Redirecting to login...');
      navigate('/auth/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    console.log('ProtectedRoute - showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute - no user, returning null');
    return null;
  }

  console.log('ProtectedRoute - rendering children for user:', user.email);
  return <>{children}</>;
}
