export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateTicket = (ticket) => {
  const errors = {}

  if (!ticket.title || ticket.title.trim() === "") {
    errors.title = "Title is required."
  }

  if (!ticket.status || !["open", "in_progress", "closed"].includes(ticket.status)) {
    errors.status = "Invalid status selected."
  }

  return errors
}
