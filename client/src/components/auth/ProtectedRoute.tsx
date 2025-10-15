import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to home if user doesn't have permission
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
