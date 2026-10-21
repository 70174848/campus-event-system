const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(v) {
  if (!v.trim()) return 'Email is required';
  if (!emailRe.test(v.trim())) return 'Enter a valid email address';
  return '';
}

export function validatePassword(v) {
  if (!v) return 'Password is required';
  if (v.length < 6) return 'Password must be at least 6 characters';
  return '';
}

export function validateName(v) {
  if (!v.trim()) return 'Name is required';
  if (v.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
}

export function validatePhone(v) {
  if (!v.trim()) return ''; // optional
  if (!/^[0-9+\-\s]{7,15}$/.test(v.trim())) return 'Enter a valid phone number';
  return '';
}
