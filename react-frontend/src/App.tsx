import "./App.css";
import { BrowserRouter as Router, Routes, Navigate, Route, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useValidateToken } from './hooks/useValidateToken'
import { decryptToken } from '@/utils/crypto'
// ✅ PrivateRoute with useQuery (TanStack)
const PrivateRoute = () => {
  const { data, isLoading, isError } = useValidateToken()

  if (isLoading) return <div>Loading...</div>

  return !isError && data?.valid ? <Outlet /> : <Navigate to="/" />
}

// 🔐 PublicRoute — block login if logged in
const PublicRoute = () => {
  const encrypted = localStorage.getItem('token')
  const token = encrypted ? decryptToken(encrypted) : null
  return token ? <Navigate to="/dashboard" /> : <Outlet />
}
function App() {
  return (
    <Router>
      <Routes>
        {/* Login (only if not logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* Dashboard (only if token is valid) */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
