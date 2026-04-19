import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // 1. Basic check: Does it exist?
  if (!token) return <Navigate to="/login" replace />;

  // 2. Structural check: Does it look like a JWT?
  const parts = token.split('.');
  if (parts.length !== 3) {
    localStorage.removeItem('token'); // Kill the fake
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute