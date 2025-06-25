import React from 'react';
import { Route, Redirect, useLocation } from 'wouter';
import type { RouteProps } from 'wouter';

// Helper to check authentication status
const useAuth = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const [, navigate] = useLocation();

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/auth', { replace: true });
  };

  return { isAuthenticated, logout };
};

interface CustomProtectedRouteProps extends Omit<RouteProps, 'component' | 'children'> {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<CustomProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route {...rest}>
      {(params) =>
        isAuthenticated ? (
          <Component {...params} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
export { useAuth };