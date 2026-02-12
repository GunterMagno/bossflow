// ============================================================
// File: PrivateRoute.jsx
// Description: Route guard component that redirects unauthenticated users to the login page.
// ============================================================
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PrivateRoute.css';

/**
 * Component to protect routes that require authentication.
 *
 * Usage:
 * <Route
 *   path="/protected-route"
 *   element={
 *     <PrivateRoute>
 *       <ProtectedComponent />
 *     </PrivateRoute>
 *   }
 * />
 */
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <article className="private-route__loading">
        <figure className="private-route__spinner"></figure>
        <p className="private-route__texto">Verificando autenticación...</p>
      </article>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
