"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { getTickets } from "../utils/storage"
import "../styles/dashboard.css"

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  })
  const navigate = useNavigate()

  useEffect(() => {
    const tickets = getTickets()
    const openCount = tickets.filter((t) => t.status === "open").length
    const resolvedCount = tickets.filter((t) => t.status === "closed").length

    setStats({
      total: tickets.length,
      open: openCount,
      resolved: resolvedCount,
    })
  }, [])

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="dashboard-main">
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's your ticket overview.</p>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Tickets</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
            <div className="stat-card">
              <h3>Open Tickets</h3>
              <p className="stat-number stat-open">{stats.open}</p>
            </div>
            <div className="stat-card">
              <h3>Resolved Tickets</h3>
              <p className="stat-number stat-resolved">{stats.resolved}</p>
            </div>
          </div>

          <div className="dashboard-actions">
            <button onClick={() => navigate("/tickets")} className="btn btn-primary">
              Manage Tickets
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
