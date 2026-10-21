import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, normalizeEvent } from '../api';
import SearchFilterBar from '../components/SearchFilterBar';

export default function EventsBrowse() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEvents()
      .then((list) => setEvents(list.map(normalizeEvent)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(events.map((e) => e.category).filter(Boolean))],
    [events]
  );

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.trim().toLowerCase()) &&
      (!category || e.category === category)
  );

  return (
    <div>
      <h2>Events</h2>
      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        categories={categories}
      />
      {loading && <p>Loading events...</p>}
      {error && <p className="m3-err">{error}</p>}
      {!loading && !error && filtered.length === 0 && <p>No events found.</p>}
      <div className="m3-grid">
        {filtered.map((e) => (
          <div className="m3-card" key={e.id}>
            <h3>{e.title}</h3>
            <p>{e.date} {e.time}</p>
            <p>{e.location}</p>
            {e.category && <span className="m3-tag">{e.category}</span>}
            <p><Link to={`/events/${e.id}`}>View details</Link></p>
          </div>
        ))}
      </div>
    </div>
  );
}
