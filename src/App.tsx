import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ui/Toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import { HomePage } from './pages/public/HomePage';
import { FindDoctorPage } from './pages/public/FindDoctorPage';
import { SpecialitiesPage } from './pages/public/SpecialitiesPage';
import { SpecialityDetailPage } from './pages/public/SpecialityDetailPage';
import { DoctorProfilePage } from './pages/public/DoctorProfilePage';
import { BookAppointmentPage } from './pages/public/BookAppointmentPage';
import { TrackAppointmentPage } from './pages/public/TrackAppointmentPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { PatientDashboardPage } from './pages/patient/PatientDashboardPage';
import { ReceptionDashboardPage } from './pages/staff/ReceptionDashboardPage';
import { DoctorDashboardPage } from './pages/staff/DoctorDashboardPage';
import { AdminDashboardPage } from './pages/staff/AdminDashboardPage';

// Layout component
function AppLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: 'var(--header-height)' }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/find-doctor" element={<FindDoctorPage />} />
              <Route path="/specialities" element={<SpecialitiesPage />} />
              <Route path="/specialities/:id" element={<SpecialityDetailPage />} />
              <Route path="/doctor/:id" element={<DoctorProfilePage />} />
              <Route path="/doctors/:id" element={<DoctorProfilePage />} />
              <Route path="/book" element={<Navigate to="/find-doctor" replace />} />
              <Route path="/book/:id" element={<BookAppointmentPage />} />
              <Route path="/track" element={<TrackAppointmentPage />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage type="patient" />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/staff/login" element={<LoginPage type="staff" />} />
              <Route path="/staff-login" element={<LoginPage type="staff" />} />
              
              {/* Patient Routes */}
              <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
              <Route path="/appointments" element={<PatientDashboardPage />} />
              
              {/* Staff Routes */}
              <Route path="/reception" element={<ReceptionDashboardPage />} />
              <Route path="/doctor" element={<DoctorDashboardPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>
          </Routes>
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


