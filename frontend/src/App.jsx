
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch('/api/events')

        if (!response.ok) {
          throw new Error('Could not load events. Please try again.')
        }

        const data = await response.json()
        setEvents(Array.isArray(data.events) ? data.events : [])
      } catch (err) {
        setError(
          err.message || 'Could not connect to the server. Please check your backend.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const formatDate = (date) => {
    if (!date) return 'Date TBA'

    const parsedDate = new Date(`${date}T00:00:00`)

    if (Number.isNaN(parsedDate.getTime())) return date

    return parsedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <a className="logo" href="#">
          <span className="logo-icon">✦</span>
          Campus<span>Events</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="nav-button" href="#events">
          Explore Events <span>↗</span>
        </a>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              ✦ &nbsp; YOUR CAMPUS, YOUR COMMUNITY
            </span>

            <h1>
              Make Every
              <br />
              Campus Moment
              <br />
              <span>Count.</span>
            </h1>

            <p>
              Discover events, connect with your community, and create
              unforgettable university memories.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#events">
                Discover Events <span>↗</span>
              </a>
              <a className="secondary-button" href="#about">
                Learn More
              </a>
            </div>

            <div className="hero-note">
              <span className="online-dot" />
              Your next campus experience starts here.
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />

            <div className="hero-art-card hero-art-main">
              <span className="hero-art-icon">🎓</span>
              <span className="hero-art-label">CAMPUS LIFE</span>
              <strong>Ideas. People. Experiences.</strong>
            </div>

            <div className="floating-card floating-card-top">
              <span className="floating-icon">✦</span>
              <div>
                <strong>Discover</strong>
                <small>Something new</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-icon">♡</span>
              <div>
                <strong>Connect</strong>
                <small>With your community</small>
              </div>
            </div>

            <span className="hero-sparkle sparkle-one">✳</span>
            <span className="hero-sparkle sparkle-two">✦</span>
          </div>
        </section>

        {/* Events Section */}
        <section className="events-section" id="events">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT'S HAPPENING</span>
              <h2>
                Find Your Next <span>Experience.</span>
              </h2>
              <p>
                From exciting activities to inspiring gatherings, find
                something happening on your campus.
              </p>
            </div>

            <a className="text-link" href="#contact">
              Get Involved <span>↗</span>
            </a>
          </div>

          <div className="event-grid">
            {loading && (
              <p className="events-message">Loading campus events...</p>
            )}

            {!loading && error && (
              <div className="events-message" role="alert">
                <p>{error}</p>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && events.length === 0 && (
              <p className="events-message">
                No events available yet. Check back soon!
              </p>
            )}

            {!loading &&
              !error &&
              events.map((event, index) => (
                <article className="event-card" key={event.id ?? index}>
                  <div
                    className={`event-art ${
                      ['blue', 'purple', 'orange'][index % 3]
                    }`}
                  >
                    <span className="event-category">Campus Event</span>
                    <span className="event-emoji" aria-hidden="true">
                      🎓
                    </span>
                  </div>

                  <div className="event-info">
                    <div className="event-date">
                      ▦ &nbsp; {formatDate(event.date)}
                      {event.time ? ` · ${event.time}` : ''}
                    </div>

                    <h3>{event.title}</h3>

                    <p>
                      {event.description ||
                        'Join us for this exciting campus event.'}
                    </p>

                    <div className="event-bottom">
                      <span>
                        📍 {event.location || 'Location to be announced'}
                      </span>

                      <a
                        href="#contact"
                        aria-label={`Learn more about ${event.title}`}
                      >
                        ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        {/* About Section */}
        <section className="about-section" id="about">
          <div className="about-visual" aria-hidden="true">
            <div className="about-symbol">✦</div>
            <div className="about-circle">
              <span>YOUR</span>
              <strong>CAMPUS</strong>
              <span>YOUR COMMUNITY</span>
            </div>
          </div>

          <div className="about-content">
            <span className="eyebrow">MORE THAN JUST EVENTS</span>
            <h2>
              Campus Life,
              <br />
              <span>Connected.</span>
            </h2>

            <p>
              CampusEvents brings university activities together in one place.
              Discover opportunities to learn, meet people, share ideas, and
              make the most of your campus experience.
            </p>

            <a className="primary-button" href="#events">
              Explore What's On <span>↗</span>
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact">
          <span className="eyebrow">BE PART OF IT</span>
          <h2>
            Your Campus.
            <br />
            Your <span>Story.</span>
          </h2>

          <p>
            Explore upcoming events and take the next step in your campus
            journey.
          </p>

          <a className="primary-button" href="#events">
            Find an Event <span>↗</span>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a className="logo" href="#home">
          <span className="logo-icon">✦</span>
          Campus<span>Events</span>
        </a>

        <p>Bringing campus communities together.</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <span className="copyright">
          © {new Date().getFullYear()} CampusEvents. All rights reserved.
        </span>
      </footer>
    </div>
  )
}

export default App
