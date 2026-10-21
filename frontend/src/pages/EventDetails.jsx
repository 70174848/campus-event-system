import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getEvent, normalizeEvent, registerForEvent } from '../api';
import { getUser, isLoggedIn } from '../auth';
import { validateEmail, validateName, validatePhone } from '../validation';

export default function EventDetails() {
  const { id } = useParams();
  const user = getUser();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: user?.name || user?.username || '',
    email: user?.email || '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getEvent(id)
      .then((e) => setEvent(normalizeEvent(e)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const errs = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setSubmitting(true);
    try {
      await registerForEvent(event.id, form);
      setMessage({ type: 'ok', text: 'You are registered for this event!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Loading event...</p>;
  if (error) return <p className="m3-err">{error} <Link to="/">Back to events</Link></p>;

  return (
    <div>
      <p><Link to="/">&larr; Back to events</Link></p>
      <div className="m3-card">
        <h2>{event.title}</h2>
        {event.category && <span className="m3-tag">{event.category}</span>}
        <p>{event.description}</p>
        <p><strong>Date:</strong> {event.date} {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        {event.seats !== null && <p><strong>Available seats:</strong> {event.seats}</p>}
      </div>

      <div className="m3-card">
        <h3>Register for this event</h3>
        {!isLoggedIn() ? (
          <p>Please <Link to="/login">log in</Link> to register.</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label>Name
              <input value={form.name} onChange={set('name')} />
              {errors.name && <span className="m3-err">{errors.name}</span>}
            </label>
            <label>Email
              <input type="email" value={form.email} onChange={set('email')} />
              {errors.email && <span className="m3-err">{errors.email}</span>}
            </label>
            <label>Phone (optional)
              <input value={form.phone} onChange={set('phone')} />
              {errors.phone && <span className="m3-err">{errors.phone}</span>}
            </label>
            {message.text && <p className={message.type === 'ok' ? 'm3-ok' : 'm3-err'}>{message.text}</p>}
            <button type="submit" disabled={submitting}>{submitting ? 'Registering...' : 'Register'}</button>
          </form>
        )}
      </div>
    </div>
  );
}
