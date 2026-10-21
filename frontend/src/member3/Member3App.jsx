// Temporary shell so Member 3's pages can be tested on their own.
// Member 2's navbar/layout can replace this later; the pages stay the same.
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import EventsBrowse from '../pages/EventsBrowse';
import EventDetails from '../pages/EventDetails';
import Dashboard from '../pages/Dashboard';
import { isLoggedIn, logout } from '../auth';
import '../member3.css';

function Nav() {
  const navigate = useNavigate();
  return (
    <nav className="m3-nav">
      <Link to="/">Events</Link>
      <Link to="/dashboard">Dashboard</Link>
      {isLoggedIn() ? (
        <button className="m3-link" onClick={() => { logout(); navigate('/login'); }}>Log out</button>
      ) : (
        <Link to="/login">Log in</Link>
      )}
    </nav>
  );
}

export default function Member3App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="m3-main">
        <Routes>
          <Route path="/" element={<EventsBrowse />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
