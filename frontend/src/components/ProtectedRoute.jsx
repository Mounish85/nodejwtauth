import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';
export default function ProtectedRoute({ children }) { const { isAuthenticated, isLoading } = useAuth(); const location = useLocation(); return isLoading ? <Loader /> : isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />; }
