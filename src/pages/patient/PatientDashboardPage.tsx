import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockDb } from '../../data/mockDb';
import { useMockDbVersion } from '../../hooks/useMockDbVersion';
import { format, parseISO, isPast } from 'date-fns';
import { formatTime } from '../../utils/formatUtils';
import { StatusBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Calendar, Clock, MapPin, Stethoscope, ChevronRight } from 'lucide-react';
import './PatientDashboardPage.css';

export function PatientDashboardPage() {
  const { user } = useAuth();
  useMockDbVersion();


  const appointments = user ? mockDb.getAppointmentsByPatientId(user.userId) : [];

  const upcoming = appointments
    .filter(apt => ['BOOKED', 'CONFIRMED', 'CHECKED_IN', 'WAITING', 'IN_CONSULTATION'].includes(apt.status))
    .sort((a, b) => parseISO(`${a.date}T${a.time}`).getTime() - parseISO(`${b.date}T${b.time}`).getTime());

  const past = appointments
    .filter(apt => ['COMPLETED', 'CANCELLED', 'RESCHEDULED'].includes(apt.status) || isPast(parseISO(`${apt.date}T${apt.time}`)))
    .sort((a, b) => parseISO(`${b.date}T${b.time}`).getTime() - parseISO(`${a.date}T${a.time}`).getTime());

  if (!user || user.role !== 'patient') {
    return <Navigate to="/login" replace />;
  }
  return (
    <main className="patient-dashboard page-content">
      <div className="dashboard-header">
        <div className="container dashboard-header__inner">
          <div>
            <h1 className="text-h2">My Appointments</h1>
            <p className="dashboard-header__date">Manage your upcoming visits and view history.</p>
          </div>
          <div className="dashboard-header__user">
            <span className="text-body-sm">Welcome, <strong>{user.name}</strong></span>
          </div>
        </div>
      </div>

      <div className="container patient-dashboard__content">
        <div className="patient-dashboard__section">
          <div className="patient-dashboard__section-header">
            <h2 className="text-h3">Upcoming Appointments</h2>
            <Link to="/find-doctor">
              <Button variant="outline" size="sm">Book New Appointment</Button>
            </Link>
          </div>

          {upcoming.length > 0 ? (
            <div className="patient-appointments-grid">
              {upcoming.map(apt => {
                const doc = mockDb.getDoctorById(apt.doctorId);
                return (
                  <div key={apt.id} className="patient-apt-card">
                    <div className="patient-apt-card__header">
                      <div className="patient-apt-card__datetime">
                        <span className="patient-apt-card__date">
                          <Calendar size={14} /> {format(parseISO(apt.date), 'MMM d, yyyy')}
                        </span>
                        <span className="patient-apt-card__time">
                          <Clock size={14} /> {formatTime(apt.time)}
                        </span>
                      </div>
                      <StatusBadge status={apt.status} />
                    </div>

                    <div className="patient-apt-card__body">
                      <h3 className="patient-apt-card__doc">
                        <Stethoscope size={16} className="text-disabled" />
                        {doc?.name}
                      </h3>
                      <p className="patient-apt-card__meta">
                        <MapPin size={14} className="text-disabled" />
                        {doc?.hospital}
                      </p>
                      {apt.tokenNumber && (
                        <p className="patient-apt-card__token">
                          Token Number: <strong>{String(apt.tokenNumber).padStart(2, '0')}</strong>
                        </p>
                      )}
                    </div>

                    <div className="patient-apt-card__footer">
                      <Link to={`/track?id=${apt.id}&phone=${apt.patientPhone}`} className="patient-apt-card__link">
                        Track Status <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="patient-empty">
              <p>You have no upcoming appointments.</p>
              <Link to="/find-doctor" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
                <Button variant="primary">Find a Doctor</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="patient-dashboard__section">
          <h2 className="text-h3" style={{ marginBottom: 'var(--space-6)' }}>Past Appointments</h2>
          
          {past.length > 0 ? (
            <div className="patient-history-list">
              {past.map(apt => {
                const doc = mockDb.getDoctorById(apt.doctorId);
                return (
                  <div key={apt.id} className="patient-history-item">
                    <div className="patient-history-item__date">
                      {format(parseISO(apt.date), 'MMM d, yyyy')}
                    </div>
                    <div className="patient-history-item__info">
                      <h4 className="patient-history-item__doc">{doc?.name}</h4>
                      <p className="patient-history-item__meta">{apt.appointmentType === 'FIRST_VISIT' ? 'First Visit' : 'Follow Up'}</p>
                    </div>
                    <div className="patient-history-item__status">
                      <StatusBadge status={apt.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-body text-secondary">No past appointments found.</p>
          )}
        </div>
      </div>
    </main>
  );
}



