"use client"
import "../styles/ticket-card.css"

function TicketCard({ ticket, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "status-open"
      case "in_progress":
        return "status-in-progress"
      case "closed":
        return "status-closed"
      default:
        return ""
    }
  }

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h3>{ticket.title}</h3>
        <span className={`status-badge ${getStatusColor(ticket.status)}`}>{ticket.status.replace("_", " ")}</span>
      </div>
      <p className="ticket-description">{ticket.description || "No description"}</p>
      <div className="ticket-footer">
        <span className="ticket-priority">Priority: {ticket.priority || "Normal"}</span>
        <div className="ticket-actions">
          <button onClick={() => onEdit(ticket)} className="btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(ticket.id)} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
