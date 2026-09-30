import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockDb } from '../../data/mockDb';
import { useMockDbVersion } from '../../hooks/useMockDbVersion';
import { format, startOfToday } from 'date-fns';
import { formatTime } from '../../utils/formatUtils';
import { Appointment, canTransition } from '../../types/appointment';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { StatusBadge } from '../../components/ui/Badge';
import { Play, CheckCircle } from 'lucide-react';
import './DoctorDashboardPage.css';

export function DoctorDashboardPage() {
  const { user } = useAuth();
  useMockDbVersion();
  const todayStr = format(startOfToday(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const appointments = user?.doctorId ? mockDb.getAppointmentsByDoctorId(user.doctorId).filter(item => item.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time) || (a.tokenNumber ?? 999) - (b.tokenNumber ?? 999)) : [];
  const activeQueue = appointments.filter(item => item.status === 'WAITING' || item.status === 'IN_CONSULTATION');
  const upcomingQueue = appointments.filter(item => item.status === 'BOOKED' || item.status === 'CONFIRMED' || item.status === 'CHECKED_IN');
  const completedQueue = appointments.filter(item => item.status === 'COMPLETED');

  if (!user || user.role !== 'doctor') return <Navigate to="/staff/login" replace />;

  function handleStatusUpdate(appointmentId: string, newStatus: Appointment['status']) {
    try { mockDb.updateAppointmentStatus(appointmentId, newStatus, user!.name, 'doctor'); }
    catch { window.alert('The appointment status could not be updated.'); }
  }

  return (
    <main className="doctor-dashboard page-content">
      <div className="dashboard-header"><div className="container dashboard-header__inner"><div><h1 className="text-h2">Doctor Dashboard</h1><p className="dashboard-header__date">{format(new Date(`${selectedDate}T12:00:00`), 'EEEE, MMMM d, yyyy')}</p></div><div className="dashboard-header__user"><span className="text-body-sm">Welcome, <strong>{user.name}</strong></span></div></div></div>
      <div className="container doctor-dashboard__content">
        <div className="doctor-date-filter"><Input type="date" label="Schedule date" value={selectedDate} min={todayStr} onChange={event => setSelectedDate(event.target.value)} /><p className="text-caption text-secondary">Only appointments assigned to your doctor account are shown.</p></div>
        {!user.doctorId && <div className="dashboard-empty">This staff account has no doctor profile assigned.</div>}
        <div className="doctor-dashboard__grid">
          <section className="dashboard-card active-queue"><h2 className="dashboard-card__title text-h4">Patient Queue ({activeQueue.length})</h2>
            {activeQueue.length ? <div className="patient-list">{activeQueue.map(appointment => {
              const inConsultation = appointment.status === 'IN_CONSULTATION';
              return <div key={appointment.id} className={`patient-card ${inConsultation ? 'patient-card--active' : ''}`}>
                <div className="patient-card__header"><div className="patient-card__token">{appointment.tokenNumber ? String(appointment.tokenNumber).padStart(2, '0') : '—'}</div><div className="patient-card__info"><h3 className="patient-card__name">{appointment.patientName}</h3><p className="patient-card__meta">{formatTime(appointment.time)}–{formatTime(appointment.endTime || appointment.time)} · {appointment.appointmentType === 'FIRST_VISIT' ? 'First Visit' : 'Follow Up'}</p></div><StatusBadge status={appointment.status} /></div>
                {appointment.reason && <div className="patient-card__reason"><strong>Reason:</strong> {appointment.reason}</div>}
                <div className="patient-card__actions">{canTransition(appointment.status, 'IN_CONSULTATION') && <Button size="sm" variant="primary" onClick={() => handleStatusUpdate(appointment.id, 'IN_CONSULTATION')}><Play size={14} /> Start Consultation</Button>}{canTransition(appointment.status, 'COMPLETED') && <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}><CheckCircle size={14} /> Mark Completed</Button>}</div>
              </div>;
            })}</div> : <div className="dashboard-empty">No patients waiting or in consultation for this date.</div>}
          </section>
          <aside className="dashboard-sidebar">
            <section className="dashboard-card"><h2 className="dashboard-card__title text-h4">Scheduled ({upcomingQueue.length})</h2><ul className="mini-patient-list">{upcomingQueue.map(appointment => <li key={appointment.id} className="mini-patient"><span className="mini-patient__time">{formatTime(appointment.time)}</span><span className="mini-patient__name">{appointment.patientName}</span><StatusBadge status={appointment.status} /></li>)}{!upcomingQueue.length && <li className="dashboard-empty dashboard-empty--sm">No scheduled patients.</li>}</ul></section>
            <section className="dashboard-card" style={{ marginTop: 'var(--space-6)' }}><h2 className="dashboard-card__title text-h4">Completed ({completedQueue.length})</h2><ul className="mini-patient-list">{completedQueue.map(appointment => <li key={appointment.id} className="mini-patient mini-patient--dim"><span className="mini-patient__time">{formatTime(appointment.time)}</span><span className="mini-patient__name">{appointment.patientName}</span></li>)}{!completedQueue.length && <li className="dashboard-empty dashboard-empty--sm">No completed appointments yet.</li>}</ul></section>
          </aside>
        </div>
      </div>
    </main>
  );
}
