import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { useValidateToken } from './hooks/useValidateToken'
import { decryptToken } from '@/utils/crypto'
import MainLayout from './layouts/MainLayout'
import TestPage from './pages/TestPage' // ⬅️ Add this line

// ✅ PrivateRoute using TanStack
const PrivateRoute = () => {
  const { data, isLoading, isError } = useValidateToken()
  if (isLoading) return <div>Loading...</div>
  return !isError && data?.valid ? <Outlet /> : <Navigate to="/" />
}

// 🔓 PublicRoute for login
const PublicRoute = () => {
  const encrypted = localStorage.getItem('token')
  const token = encrypted ? decryptToken(encrypted) : null
  return token ? <Navigate to="/dashboard" /> : <Outlet />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Login) */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* Private Routes with Sidebar */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/test" element={<TestPage />} />
            {/* Add more routes below this that need the sidebar */}
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
