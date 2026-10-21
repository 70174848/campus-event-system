import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getMyRegistrations, normalizeEvent } from '../api';
import { getUser, isLoggedIn } from '../auth';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getUser();

  useEffect(() => {
    if (!isLoggedIn()) return;
    getMyRegistrations()
      .then((list) =>
        setItems(
          list.map((r) => ({
            ...normalizeEvent(r.event || r),
            eventId: r.event_id ?? r.eventId ?? r.event?.id ?? r.id,
          }))
        )
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (!isLoggedIn()) return <Navigate to="/login" replace />;

  return (
    <div>
      <h2>My Dashboard</h2>
      {user?.email && <p>Logged in as <strong>{user.name || user.username || user.email}</strong></p>}
      <h3>My registered events</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="m3-err">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p>You have not registered for any events yet. <Link to="/">Browse events</Link></p>
      )}
      <div className="m3-grid">
        {items.map((e, i) => (
          <div className="m3-card" key={`${e.eventId}-${i}`}>
            <h3>{e.title}</h3>
            <p>{e.date} {e.time}</p>
            <p>{e.location}</p>
            {e.eventId && <Link to={`/events/${e.eventId}`}>View event</Link>}
          </div>
        ))}
      </div>
    </div>
  );
}
