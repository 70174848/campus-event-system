// All backend calls live here. Vite proxies /api -> http://localhost:5000
const BASE = '/api';

export function getToken() {
  try { return localStorage.getItem('token'); } catch { return null; }
}

async function request(path, options = {}) {
  const token = getToken();
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error('Cannot reach the server. Is the backend running?');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || `Request failed (${res.status})`);
  }
  return data;
}

// ---- Auth ----
export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const signup = (name, email, password) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, username: name, email, password }),
  });

// ---- Events ----
// The backend may return an array or { events: [...] }; this handles both.
const asList = (d) => (Array.isArray(d) ? d : d.events || d.data || d.registrations || []);

export const getEvents = async () => asList(await request('/events'));
export const getEvent = async (id) => {
  const d = await request(`/events/${id}`);
  return d.event || d.data || d;
};

// ---- Registrations ----
export const registerForEvent = (eventId, form) =>
  request('/registrations', {
    method: 'POST',
    body: JSON.stringify({ event_id: eventId, eventId, ...form }),
  });

export async function getMyRegistrations() {
  try {
    return asList(await request('/registrations/my'));
  } catch {
    return asList(await request('/registrations'));
  }
}

// Field names differ between backends, so pages read events through this.
export function normalizeEvent(e = {}) {
  return {
    id: e.id ?? e.event_id ?? e._id,
    title: e.title ?? e.name ?? e.event_name ?? 'Untitled event',
    description: e.description ?? e.details ?? '',
    date: e.date ?? e.event_date ?? '',
    time: e.time ?? e.event_time ?? '',
    location: e.location ?? e.venue ?? '',
    category: e.category ?? e.type ?? '',
    seats: e.available_seats ?? e.seats ?? e.capacity ?? e.max_participants ?? null,
  };
}
