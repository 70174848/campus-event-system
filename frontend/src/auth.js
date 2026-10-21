export function saveSession(data) {
  try {
    if (data.token) localStorage.setItem('token', data.token);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
  } catch { /* storage unavailable */ }
}

export function getUser() {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}

export function isLoggedIn() {
  try { return !!localStorage.getItem('token'); } catch { return false; }
}

export function logout() {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch { /* ignore */ }
}
