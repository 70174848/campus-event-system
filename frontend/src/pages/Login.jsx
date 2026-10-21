import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../api';
import { saveSession } from '../auth';
import { validateEmail, validatePassword, validateName } from '../validation';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function validate() {
    const errs = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    if (mode === 'signup') errs.name = validateName(form.name);
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (!validate()) return;
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signup(form.name, form.email, form.password);
        setMessage({ type: 'ok', text: 'Account created. Please log in.' });
        setMode('login');
      } else {
        const data = await login(form.email, form.password);
        saveSession({ ...data, user: data.user || { email: form.email } });
        navigate('/dashboard');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
    setMessage({ type: '', text: '' });
  }

  return (
    <div className="m3-card">
      <h2>{mode === 'login' ? 'Log in' : 'Create an account'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        {mode === 'signup' && (
          <label>
            Name
            <input value={form.name} onChange={set('name')} />
            {errors.name && <span className="m3-err">{errors.name}</span>}
          </label>
        )}
        <label>
          Email
          <input type="email" value={form.email} onChange={set('email')} />
          {errors.email && <span className="m3-err">{errors.email}</span>}
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={set('password')} />
          {errors.password && <span className="m3-err">{errors.password}</span>}
        </label>
        {message.text && <p className={message.type === 'ok' ? 'm3-ok' : 'm3-err'}>{message.text}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Sign up'}
        </button>
      </form>
      <p>
        {mode === 'login' ? 'No account yet?' : 'Already have an account?'}{' '}
        <button type="button" className="m3-link" onClick={switchMode}>
          {mode === 'login' ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </div>
  );
}
