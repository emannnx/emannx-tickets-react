export const getTickets = () => {
  const tickets = localStorage.getItem("tickets_data")
  return tickets ? JSON.parse(tickets) : []
}

export const saveTickets = (tickets) => {
  localStorage.setItem("tickets_data", JSON.stringify(tickets))
}

export const getSession = () => {
  return localStorage.getItem("ticketapp_session")
}

export const setSession = (email) => {
  const token = btoa(`${email}:${Date.now()}`)
  localStorage.setItem("ticketapp_session", token)
}

export const clearSession = () => {
  localStorage.removeItem("ticketapp_session")
}
