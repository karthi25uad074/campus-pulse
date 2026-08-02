import { Link } from "react-router-dom";
import "./App.css";
function Home() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 90; // Navbar height
      const top =
        element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">CP</div>
          <span>Campus<span className="logo-highlight">Pulse</span></span>
        </div>

       <div className="nav-links">
  <button onClick={() => scrollToSection("features")}>
    Features
  </button>

  <button onClick={() => scrollToSection("how-it-works")}>
    How It Works
  </button>

  <button onClick={() => scrollToSection("about")}>
    About
  </button>
</div>
        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
        Login
        </Link>
         <Link to="/register" className="signup-btn">
         Get Started
        </Link>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            <span className="badge-dot"></span>
            Smarter Campus. Better Experience.
          </div>

          <h1>
            Make Your Campus
            <span> Better Together.</span>
          </h1>

          <p>
            Campus Pulse helps students report campus issues,
            track their progress, and stay connected with the
            people working to improve their campus.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
                Report an Issue →
            </Link>

            <button className="secondary-btn">
              Explore Campus
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>1,200+</strong>
              <span>Issues Reported</span>
            </div>

            <div>
              <strong>94%</strong>
              <span>Issues Resolved</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Campus Support</span>
            </div>
          </div>

        </div>


        {/* Dashboard Preview */}
        <div className="hero-dashboard">

          <div className="dashboard-window">

            <div className="window-header">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="window-title">
                Campus Dashboard
              </div>
            </div>


            <div className="dashboard-body">

              <div className="dashboard-welcome">
                <div>
                  <p>Good morning 👋</p>
                  <h3>Campus Overview</h3>
                </div>

                <div className="avatar">
                  K
                </div>
              </div>


              <div className="dashboard-cards">

                <div className="mini-card">
                  <div className="mini-icon issue-icon">!</div>
                  <div>
                    <span>Active Issues</span>
                    <strong>24</strong>
                  </div>
                </div>

                <div className="mini-card">
                  <div className="mini-icon resolved-icon">✓</div>
                  <div>
                    <span>Resolved</span>
                    <strong>186</strong>
                  </div>
                </div>

                <div className="mini-card">
                  <div className="mini-icon users-icon">●</div>
                  <div>
                    <span>Students</span>
                    <strong>2.4K</strong>
                  </div>
                </div>

              </div>


              <div className="recent-section">

                <div className="recent-header">
                  <h4>Recent Issues</h4>
                  <span>View all →</span>
                </div>

                <div className="issue-row">
                  <div className="issue-info">
                    <div className="issue-circle">Wi</div>
                    <div>
                      <strong>Wi-Fi Connectivity</strong>
                      <span>Computer Science Block</span>
                    </div>
                  </div>

                  <div className="status progress">
                    In Progress
                  </div>
                </div>

                <div className="issue-row">
                  <div className="issue-info">
                    <div className="issue-circle">Li</div>
                    <div>
                      <strong>Library Lighting</strong>
                      <span>Main Library - 2nd Floor</span>
                    </div>
                  </div>

                  <div className="status resolved">
                    Resolved
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features Section */}
      <section className="features" id="features">

        <div className="section-heading">
          <span>WHY CAMPUS PULSE</span>
          <h2>Everything your campus needs.</h2>
          <p>
            A simple platform that connects students,
            staff and administrators to create a better campus.
          </p>
        </div>


        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Report Issues</h3>
            <p>
              Report campus problems quickly with location,
              category and supporting images.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Track Progress</h3>
            <p>
              Follow every issue from submission to resolution
              with real-time status updates.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Analytics</h3>
            <p>
              Help administrators understand campus problems
              using meaningful data and insights.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Better Together</h3>
            <p>
              Connect students, staff and administrators
              through one transparent platform.
            </p>
          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="how-section" id="how-it-works">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From problem to solution.</h2>
          <p>
            Campus Pulse makes issue reporting simple and transparent.
          </p>
        </div>


        <div className="steps">

          <div className="step">
            <div className="step-number">01</div>
            <h3>Report</h3>
            <p>
              Students submit a campus issue with the necessary details.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Assign</h3>
            <p>
              Administrators verify the issue and assign it to staff.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Resolve</h3>
            <p>
              Staff work on the issue and update its progress.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Improve</h3>
            <p>
              Students get updates and the campus becomes better.
            </p>
          </div>

        </div>

      </section>


      {/* CTA Section */}
      <section className="cta" id="about">

        <div>
          <span>READY TO MAKE A DIFFERENCE?</span>

          <h2>
            Your voice can improve
            <br />
            your campus.
          </h2>

          <p>
            Report a problem. Track the solution.
            Build a better campus together.
          </p>

         <Link to="/register" className="cta-button">
            Get Started →
         </Link>
        </div>

      </section>


      {/* Footer */}
      <footer>

        <div className="footer-logo">
          <div className="logo-icon">CP</div>
          <span>Campus<span className="logo-highlight">Pulse</span></span>
        </div>

        <p>
          Making campuses smarter, one issue at a time.
        </p>

        <div className="footer-bottom">
          <span>© 2026 Campus Pulse. All rights reserved.</span>
          <span>Built for better campuses.</span>
        </div>

      </footer>

    </div>
  );
}

export default Home;