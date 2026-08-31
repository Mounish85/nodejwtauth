import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { errorMessage } from '../services/api';
import Button from '../components/Button';
import { AuthCard, Field, Password } from './Login';

export default function Signup({ notify }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = key => e => setForm({ ...form, [key]: e.target.value });
  const returnHome = message => { notify(message); navigate('/', { replace: true }); };
  const submit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email || !form.password) return returnHome('Please complete every field.');
    if (form.password !== form.confirm) return returnHome('Passwords do not match.');
    setLoading(true);
    try {
      await api.post('/auth/signup', { name: form.name.trim(), email: form.email, password: form.password });
      returnHome('Account created successfully. You can now sign in.');
    } catch (e) { returnHome(errorMessage(e)); }
    finally { setLoading(false); }
  };
  return <AuthCard title="Create your account" subtitle="Start with a secure foundation in a few seconds."><form onSubmit={submit}><Field label="Full name" value={form.name} onChange={set('name')} placeholder="Alex Morgan" autoComplete="name" /><Field label="Email address" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" /><Password value={form.password} onChange={set('password')} show={show} setShow={setShow} placeholder="At least 6 characters" autoComplete="new-password" /><Password label="Confirm password" value={form.confirm} onChange={set('confirm')} show={show} setShow={setShow} placeholder="Repeat your password" autoComplete="new-password" /><Button className="form-button" loading={loading}>Create account →</Button></form><footer>Already have an account? <Link to="/login">Sign in</Link></footer></AuthCard>;
}
