"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import TicketCard from "../components/TicketCard"
import { getTickets, saveTickets } from "../utils/storage"
import { validateTicket } from "../utils/validation"
import { showToast } from "../components/Toast"
import "../styles/tickets.css"

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "Normal",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = () => {
    const savedTickets = getTickets()
    setTickets(savedTickets)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateTicket(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    if (editingId) {
      // Update existing ticket
      const updatedTickets = tickets.map((t) => (t.id === editingId ? { ...t, ...formData } : t))
      setTickets(updatedTickets)
      saveTickets(updatedTickets)
      showToast("Ticket updated successfully!", "success")
      setEditingId(null)
    } else {
      // Create new ticket
      const newTicket = {
        id: Date.now(),
        ...formData,
      }
      const updatedTickets = [...tickets, newTicket]
      setTickets(updatedTickets)
      saveTickets(updatedTickets)
      showToast("Ticket created successfully!", "success")
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "Normal",
    })
    setShowForm(false)
    setErrors({})
  }

  const handleEdit = (ticket) => {
    setFormData(ticket)
    setEditingId(ticket.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((t) => t.id !== id)
      setTickets(updatedTickets)
      saveTickets(updatedTickets)
      showToast("Ticket deleted successfully!", "success")
    }
  }

  return (
    <div className="tickets-page">
      <Navbar />
      <main className="tickets-main">
        <div className="tickets-container">
          <div className="tickets-header">
            <h1>Ticket Management</h1>
            <button
              onClick={() => {
                setShowForm(!showForm)
                if (showForm) resetForm()
              }}
              className="btn btn-primary"
            >
              {showForm ? "Cancel" : "Create Ticket"}
            </button>
          </div>

          {showForm && (
            <div className="ticket-form-container">
              <h2>{editingId ? "Edit Ticket" : "Create New Ticket"}</h2>
              <form onSubmit={handleSubmit} className="ticket-form">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter ticket title"
                    className={errors.title ? "input-error" : ""}
                  />
                  {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter ticket description"
                    rows="4"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Status *</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={errors.status ? "input-error" : ""}
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    {errors.status && <span className="error-message">{errors.status}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange}>
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  {editingId ? "Update Ticket" : "Create Ticket"}
                </button>
              </form>
            </div>
          )}

          <div className="tickets-list">
            {tickets.length === 0 ? (
              <p className="no-tickets">No tickets yet. Create one to get started!</p>
            ) : (
              <div className="tickets-grid">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Tickets
