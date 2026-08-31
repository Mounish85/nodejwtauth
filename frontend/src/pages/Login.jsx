import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api, { errorMessage } from '../services/api';
import Button from '../components/Button';

export function Field({ label, ...props }) { return <label className="field"><span>{label}</span><input required {...props} /></label>; }
export function Password({ label = 'Password', show, setShow, ...props }) { return <label className="field"><span>{label}</span><div className="password"><input required minLength="6" type={show ? 'text' : 'password'} {...props} /><button type="button" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button></div></label>; }
export function AuthCard({ title, subtitle, children }) { return <main className="auth-page"><section className="auth-card"><div className="auth-icon">⌁</div><span className="eyebrow">Secure access</span><h1>{title}</h1><p>{subtitle}</p>{children}</section></main>; }

export default function Login({ notify }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const set = key => e => setForm({ ...form, [key]: e.target.value });
  const returnHomeWithError = message => { notify(message); navigate('/', { replace: true }); };
  const submit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) return returnHomeWithError('Please enter your email and password.');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      authenticate(data);
      notify('Welcome back — you are securely signed in.');
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    } catch (e) { returnHomeWithError(errorMessage(e)); }
    finally { setLoading(false); }
  };
  return <AuthCard title="Welcome back" subtitle="Sign in to access your secure profile."><form onSubmit={submit}><Field label="Email address" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" /><Password value={form.password} onChange={set('password')} show={show} setShow={setShow} autoComplete="current-password" /><Button className="form-button" loading={loading}>Sign in →</Button></form><footer>New to JWT Auth? <Link to="/signup">Create an account</Link></footer></AuthCard>;
}
