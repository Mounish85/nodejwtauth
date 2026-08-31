import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api, { errorMessage } from '../services/api';
import Loader from '../components/Loader';
import Button from '../components/Button';

export default function Profile({ notify }) {
  const { user, authenticate, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const go = useNavigate();

  useEffect(() => {
    api.get('/auth/profile').then(({ data }) => { setProfile(data.user); authenticate({ user: data.user }); }).catch((e) => { setError(errorMessage(e)); if (e.response?.status === 401) { logout(); go('/', { replace: true }); } }).finally(() => setLoading(false));
  }, []);
  if (loading) return <Loader />;
  if (!profile) return <main className="auth-page"><section className="auth-card"><h1>Profile unavailable</h1><p>{error}</p><Button onClick={() => go('/')}>Return home</Button></section></main>;

  const signOut = async () => {
    setLoggingOut(true);
    try { await api.get('/auth/logout'); }
    catch { /* Clear browser state even if the API request fails. */ }
    finally { logout(); notify('You have been logged out successfully.'); go('/'); setLoggingOut(false); }
  };

  return <main className="profile-page"><section className="profile-heading"><span className="eyebrow"><i />Protected area</span><h1>Hello, {profile.name?.split(' ')[0] || 'there'}.</h1><p>Here’s the status of your authentication session.</p></section><section className="profile-grid"><article className="profile-card"><div className="profile-top"><span className="avatar">{(profile.name || profile.email || 'U')[0].toUpperCase()}</span><b className="status"><i />Authenticated</b></div><h2>{profile.name || 'JWT Auth user'}</h2><p>{profile.email || 'No email available'}</p><dl><div><dt>Identity</dt><dd>Verified email</dd></div><div><dt>Access level</dt><dd>Protected profile</dd></div></dl><Button variant="logout" className="wide" loading={loggingOut} onClick={signOut}>Log out securely</Button></article><article className="session-card"><span className="session-icon">⌁</span><span className="eyebrow">Session details</span><h2>JWT-protected</h2><p>Your token is sent in the Authorization header to verify protected requests.</p><div className="jwt"><b>Bearer</b> •••••••••••••• <i>Active</i></div><small>✓ This session is authenticated and ready for protected API access.</small></article></section></main>;
}
