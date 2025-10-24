import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const session = localStorage.getItem("ticketapp_session")

  if (!session) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export default ProtectedRoute
