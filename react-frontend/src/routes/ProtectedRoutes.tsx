import { Navigate, Outlet } from "react-router-dom"
import { decryptToken } from "@/utils/crypto"

export const PrivateRoute = () => {
  const encrypted = localStorage.getItem("token")
  const token = encrypted ? decryptToken(encrypted) : null

  return token ? <Outlet /> : <Navigate to="/" />
}

export const PublicRoute = () => {
  const encrypted = localStorage.getItem("token")
  const token = encrypted ? decryptToken(encrypted) : null

  return token ? <Navigate to="/dashboard" /> : <Outlet />
}
