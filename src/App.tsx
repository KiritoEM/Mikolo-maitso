import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileCompletion from './pages/ProfileCompletion';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import Irrigations from './pages/Irrigations';
import Settings from './pages/Settings';
import { ToastContainer } from 'react-toastify';

const ProtectedRoute = () => {
  const { checkIsTokenValid } = useAuth();
  console.log(checkIsTokenValid())

  if (!checkIsTokenValid()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />
};

const PublicRoute = () => {
  const { checkIsTokenValid } = useAuth();
  console.log(checkIsTokenValid());

  if (checkIsTokenValid()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/finalisation" element={<ProfileCompletion />} />
        <Route path="/dashboard" element={< Dashboard />} />
        <Route path="/plantes" element={<Plants />} />
        <Route path="/irrigations" element={<Irrigations />} />
        <Route path="/parametres" element={<Settings />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            theme="colored"
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;