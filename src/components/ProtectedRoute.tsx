import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'doctor' | 'patient')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log('ProtectedRoute user:', user); // Debug log

  // If no user is found, redirect to login
  if (!user) {
    console.log('No user found, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not allowed for this route, redirect accordingly
  if (!allowedRoles.includes(user.role)) {
    console.log(`User role (${user.role}) is not in allowedRoles`, allowedRoles);
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      case 'doctor':
        return <Navigate to="/doctor-dashboard" replace />;
      case 'patient':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  console.log('User is authorized, rendering children.');
  return <>{children}</>;
};

export default ProtectedRoute;
