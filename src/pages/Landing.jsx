import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/landing.css"

function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <svg className="wave-svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>
          <div className="hero-content">
            <div className="decorative-circle"></div>
            <h1>emannx-tickets</h1>
            <p>Streamline your workflow with intelligent ticket management</p>
            <div className="hero-buttons">
              <Link to="/auth/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/auth/signup" className="btn btn-secondary">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose emannx-tickets?</h2>
          <div className="features-grid">
            <div className="feature-box">
              <h3>Easy Management</h3>
              <p>Create, update, and manage tickets with an intuitive interface.</p>
            </div>
            <div className="feature-box">
              <h3>Real-time Updates</h3>
              <p>Track ticket status and priority in real-time.</p>
            </div>
            <div className="feature-box">
              <h3>Secure & Reliable</h3>
              <p>Your data is safe with our secure authentication system.</p>
            </div>
            <div className="feature-box">
              <h3>Responsive Design</h3>
              <p>Access your tickets from any device, anytime, anywhere.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Landing
