
import './App.css'

const events = [
  {
    title: 'Tech Innovation Summit',
    category: 'Technology',
    date: '25 OCT 2026',
    venue: 'Main Auditorium',
    description: 'Discover new technologies, meet innovators, and explore the future of computing.',
    icon: '💻',
    color: 'blue',
  },
  {
    title: 'Campus Music Night',
    category: 'Entertainment',
    date: '28 OCT 2026',
    venue: 'University Lawn',
    description: 'Enjoy live performances, music, and an unforgettable evening with friends.',
    icon: '🎵',
    color: 'pink',
  },
  {
    title: 'Career & Job Fair',
    category: 'Career',
    date: '02 NOV 2026',
    venue: 'Student Center',
    description: 'Connect with recruiters, discover career opportunities, and build your future.',
    icon: '🚀',
    color: 'orange',
  },
]

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">✦</span>
          Campus<span>Events</span>
        </a>

        <div className="nav-links">
          <a className="active" href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="nav-button" href="#events">Explore Events ↗</a>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="live-dot"></span>
              YOUR CAMPUS, YOUR COMMUNITY
            </div>

            <h1>
              Make Every<br />
              Campus Moment<br />
              <span>Count.</span>
            </h1>

            <p>
              Discover exciting events, connect with your campus community,
              and create memories that last a lifetime.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#events">
                Discover Events <span>→</span>
              </a>
              <a className="secondary-button" href="#about">
                Learn More
              </a>
            </div>

            <div className="hero-stats">
              <div><strong>25+</strong><small>Upcoming Events</small></div>
              <div><strong>1.2k+</strong><small>Active Students</small></div>
              <div><strong>15+</strong><small>Campus Clubs</small></div>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-circle circle-one"></div>
            <div className="art-circle circle-two"></div>
            <div className="floating-tag tag-top">✦ Make connections</div>
            <div className="event-illustration">
              <span className="illustration-icon">🎓</span>
              <div className="illustration-line"></div>
              <h3>Something exciting<br />is happening.</h3>
              <p>Your next campus memory starts here.</p>
              <div className="mini-people">
                <span>👩🏻</span><span>👨🏽</span><span>👩🏽</span><span>👨🏻</span>
              </div>
            </div>
            <div className="floating-tag tag-bottom">✹ Discover something new</div>
          </div>
        </section>

        <section className="events-section" id="events">
          <div className="section-heading">
            <div>
              <div className="section-label">WHAT'S HAPPENING</div>
              <h2>Upcoming <span>Events</span></h2>
              <p>Find your next favorite campus experience.</p>
            </div>
            <a className="view-all" href="#events">Explore all events ↗</a>
          </div>

          <div className="event-grid">
            {events.map((event) => (
              <article className="event-card" key={event.title}>
                <div className={`event-art ${event.color}`}>
                  <span className="event-category">{event.category}</span>
                  <span className="event-emoji">{event.icon}</span>
                </div>
                <div className="event-info">
                  <div className="event-date">▦ &nbsp;{event.date}</div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-bottom">
                    <span>📍 {event.venue}</span>
                    <a href="#contact" aria-label={`Learn more about ${event.title}`}>↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-icon">✦</div>
          <div>
            <div className="section-label">BUILT FOR STUDENTS</div>
            <h2>More than events.<br /><span>A campus that connects.</span></h2>
            <p>
              CampusEvents brings student communities together in one place.
              Find activities, discover new interests, and make campus life count.
            </p>
          </div>
          <a className="primary-button" href="#events">Find Your Event →</a>
        </section>
      </main>

      <footer className="footer" id="contact">
        <a className="brand" href="#home">
          <span className="brand-icon">✦</span>
          Campus<span>Events</span>
        </a>
        <p>Bringing campus communities together.</p>
        <span>© 2026 CampusEvents · Student Project</span>
      </footer>
    </div>
  )
}

export default App
