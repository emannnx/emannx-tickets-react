"use client"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../styles/navbar.css"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem("ticketapp_session")

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session")
    navigate("/auth/login")
  }

  // Don't show navbar on landing page
  if (location.pathname === "/") {
    return null
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          emannx-tickets
        </Link>
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/tickets" className="nav-link">
                Tickets
              </Link>
              <button onClick={handleLogout} className="nav-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="nav-link">
                Login
              </Link>
              <Link to="/auth/signup" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
