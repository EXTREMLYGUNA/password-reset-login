import { useEffect } from "react";
import { Routes,Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import {VerificationEmailPage} from './pages/VerificationEmailPage'
import { Toaster } from "@/components/ui/sonner"
import Home from './pages/Home'
import { useAuthStore } from "./store/authStore";
import { Button } from "./components/ui/button";
import ResetPasswordPage from './pages/ResetPasswordPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />; }
    return children;
  };

  const AuthenticatedUserRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    if (isAuthenticated && user) {
      return <Navigate to="/dashboard" replace />;
    }
  
    return children;
  };

function App() {
  const { isCheckingAuth, checkAuth, logout, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(user);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    await logout();
  };
  return (
    <><div>
      {user && <Button onClick={handleLogout} ></Button>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<AuthenticatedUserRoute><SignUpPage /></AuthenticatedUserRoute>} />
        <Route path='/login' element={<AuthenticatedUserRoute><LogInPage /></AuthenticatedUserRoute>} />
        <Route path='/verify-email' element={<VerificationEmailPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='/forgot-password' element={<AuthenticatedUserRoute><ForgotPasswordPage /></AuthenticatedUserRoute>} />
        <Route path='/dashboard' element={<ProtectRoute><DashboardPage /></ProtectRoute>} />
      </Routes>
      <Toaster />
      </div>
    </>
  )
}

export default App
