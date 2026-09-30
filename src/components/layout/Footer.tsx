import { Link } from 'react-router-dom';
import './Footer.css';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <BrandLogo footer />
          <p className="footer__tagline">
            Find the right care.<br />Book with confidence.
          </p>
          <p className="footer__location">Indore, Madhya Pradesh</p>
        </div>

        <div className="footer__columns">
          <div className="footer__col">
            <h3 className="footer__col-heading">Find Care</h3>
            <ul className="footer__links">
              <li><Link to="/find-doctor">Find a Doctor</Link></li>
              <li><Link to="/specialities">Specialities</Link></li>
              <li><Link to="/find-doctor">Book Appointment</Link></li>
              <li><Link to="/track">Track Appointment</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-heading">Patient</h3>
            <ul className="footer__links">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/patient/dashboard">My Appointments</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-heading">Staff</h3>
            <ul className="footer__links">
              <li><Link to="/staff/login">Staff Login</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__disclaimer">
            Doctor Care Plus is a prototype outpatient appointment platform designed for educational demonstration.
            Doctor information is displayed from publicly available professional sources.
            Doctor Care Plus is not affiliated with the listed hospitals or clinicians.
            This platform is not intended for medical emergencies.
          </p>
          <p className="footer__copyright">&#169; {new Date().getFullYear()} Doctor Care Plus. Prototype.</p>
        </div>
      </div>
    </footer>
  );
}



