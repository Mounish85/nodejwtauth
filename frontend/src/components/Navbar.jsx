import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Button from './Button';

export default function Navbar({ notify }) {
  const { isAuthenticated, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const signOut = async () => {
    setIsLoggingOut(true);
    try { await api.get('/auth/logout'); }
    catch { /* The client session still ends if the API cannot respond. */ }
    finally { logout(); notify('You have been logged out successfully.'); navigate('/'); setIsLoggingOut(false); }
  };
  return <header className="nav-shell"><nav><Link className="brand" to="/"><i>⌁</i><span>JWT <b>Auth</b></span></Link><div className="nav-links">{isAuthenticated ? <><NavLink to="/profile">Profile</NavLink><Button variant="logout" loading={isLoggingOut} onClick={signOut}>Logout</Button></> : <><Link to="/login">Login</Link><Link className="join-link" to="/signup">Sign Up <b>→</b></Link></>}</div></nav></header>;
}
