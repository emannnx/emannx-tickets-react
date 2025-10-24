"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { showToast } from "../components/Toast"
import { setSession } from "../utils/storage"
import { validateEmail, validatePassword } from "../utils/validation"
import "../styles/auth.css"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!email) {
      newErrors.email = "Email is required."
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!password) {
      newErrors.password = "Password is required."
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters."
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password."
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulated signup
    setSession(email)
    showToast("Account created successfully!", "success")
    navigate("/dashboard")
  }

  return (
    <div className="auth-page">
      <Navbar />
      <main className="auth-main">
        <div className="auth-container">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrors({ ...errors, email: "" })
                }}
                placeholder="Enter your email"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrors({ ...errors, password: "" })
                }}
                placeholder="Enter your password"
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setErrors({ ...errors, confirmPassword: "" })
                }}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Sign Up
            </button>
          </form>

          <p className="auth-link">
            Already have an account? <Link to="/auth/login">Login here</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Signup
