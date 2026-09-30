import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import { BrandLogo } from './BrandLogo';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const staffPortalPage = ['/reception', '/doctor', '/admin'].includes(location.pathname);
  const displayUser = user && ((user.role === 'patient' && !staffPortalPage) || (user.role !== 'patient' && staffPortalPage)) ? user : null;
  const publicStaffSession = Boolean(user && user.role !== 'patient' && !staffPortalPage);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
    setMobileOpen(false);
  }

  function getDashboardPath() {
    if (!user) return '/';
    switch (user.role) {
      case 'patient':     return '/patient/dashboard';
      case 'receptionist': return '/reception';
      case 'doctor':      return '/doctor';
      case 'admin':       return '/admin';
      default:            return '/';
    }
  }

  return (
    <header className="navbar" role="banner">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Doctor Care Plus — Home">
          <BrandLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Home</NavLink>
          <NavLink to="/find-doctor" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Find a Doctor</NavLink>
          <NavLink to="/specialities" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Specialities</NavLink>
          <NavLink to="/track" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Track Appointment</NavLink>
        </nav>

        {/* Desktop Auth */}
        <div className="navbar__actions">
          {displayUser ? (
            <>
              <Link to={getDashboardPath()} className="navbar__action-link">
                {displayUser.name}
              </Link>
              <button onClick={handleLogout} className="navbar__btn navbar__btn--ghost">
                Sign out
              </button>
            </>
          ) : publicStaffSession ? (
            <>
              <Link to={getDashboardPath()} className="navbar__action-link">Staff Portal</Link>
              <button onClick={handleLogout} className="navbar__btn navbar__btn--ghost">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__action-link">Patient Login</Link>
              <Link to="/staff/login" className="navbar__btn navbar__btn--outline">Staff Login</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile" aria-label="Mobile navigation">
          <nav className="navbar__mobile-nav">
            <NavLink to="/" end onClick={() => setMobileOpen(false)} className="navbar__mobile-link">Home</NavLink>
            <NavLink to="/find-doctor" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">Find a Doctor</NavLink>
            <NavLink to="/specialities" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">Specialities</NavLink>
            <NavLink to="/track" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">Track Appointment</NavLink>
            <hr className="navbar__mobile-divider" />
            {displayUser ? (
              <>
                <Link to={getDashboardPath()} onClick={() => setMobileOpen(false)} className="navbar__mobile-link">{displayUser.name}</Link>
                <button onClick={handleLogout} className="navbar__mobile-link navbar__mobile-link--button">Sign out</button>
              </>
            ) : publicStaffSession ? (
              <>
                <Link to={getDashboardPath()} onClick={() => setMobileOpen(false)} className="navbar__mobile-link">Staff Portal</Link>
                <button onClick={handleLogout} className="navbar__mobile-link navbar__mobile-link--button">Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">Patient Login</Link>
                <Link to="/staff/login" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">Staff Login</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}




