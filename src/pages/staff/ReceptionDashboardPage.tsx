import { Fragment, useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockDb } from '../../data/mockDb';
import { useMockDbVersion } from '../../hooks/useMockDbVersion';
import { addDays, format, startOfToday } from 'date-fns';
import { formatTime } from '../../utils/formatUtils';
import { AppointmentStatus, canTransition } from '../../types/appointment';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { StatusBadge } from '../../components/ui/Badge';
import { Search, UserCheck, Check, X, CalendarClock } from 'lucide-react';
import { getAvailableSlots, getGeneratedSlots } from '../../utils/slotUtils';
import './ReceptionDashboardPage.css';

function nextScheduledDate(doctorId: string, afterDate: string) {
  const doctor = mockDb.getDoctorById(doctorId);
  if (!doctor) return format(addDays(startOfToday(), 1), 'yyyy-MM-dd');
  const baseDate = new Date(`${afterDate}T12:00:00`);
  for (let offset = 1; offset <= 30; offset++) {
    const date = addDays(baseDate, offset);
    const dateString = format(date, 'yyyy-MM-dd');
    if (doctor.schedules.some(schedule => schedule.active && schedule.dayOfWeek === date.getDay())) return dateString;
  }
  return format(addDays(startOfToday(), 1), 'yyyy-MM-dd');
}

export function ReceptionDashboardPage() {
  const { user } = useAuth();
  useMockDbVersion();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const todayStr = format(startOfToday(), 'yyyy-MM-dd');
  const [rescheduleId, setRescheduleId] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState(() => format(addDays(startOfToday(), 1), 'yyyy-MM-dd'));
  const [rescheduleTime, setRescheduleTime] = useState('');
  const appointments = mockDb.getAppointments().filter(item => item.date >= todayStr);
  const selectedAppointment = rescheduleId ? mockDb.getAppointmentById(rescheduleId) : undefined;
  const selectedDoctor = selectedAppointment ? mockDb.getDoctorById(selectedAppointment.doctorId) : undefined;
  const rescheduleSlots = selectedDoctor ? getAvailableSlots(selectedDoctor.schedules, mockDb.getAppointments().filter(item => item.id !== rescheduleId), rescheduleDate, selectedDoctor.id) : [];

  const filteredAppointments = useMemo(() => appointments.filter(appointment => {
    if (statusFilter !== 'ALL' && appointment.status !== statusFilter) return false;
    const query = searchQuery.trim().toLowerCase();
    return !query || appointment.patientName.toLowerCase().includes(query) || appointment.id.toLowerCase().includes(query) || appointment.patientPhone.includes(query);
  }).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time) || (a.tokenNumber ?? 999) - (b.tokenNumber ?? 999)), [appointments, statusFilter, searchQuery]);

  if (!user || user.role !== 'receptionist') return <Navigate to="/staff/login" replace />;

  function handleStatusUpdate(appointmentId: string, status: AppointmentStatus) {
    const appointment = mockDb.getAppointmentById(appointmentId);
    if (!appointment || !canTransition(appointment.status, status)) return;
    if (status === 'CANCELLED' && !window.confirm('Cancel this appointment?')) return;
    try { mockDb.updateAppointmentStatus(appointmentId, status, user!.name, 'receptionist'); }
    catch { window.alert('The appointment status could not be updated.'); }
  }

  function saveReschedule(event: React.FormEvent) {
    event.preventDefault();
    if (!rescheduleId || !rescheduleDate || !rescheduleTime) return;
    try {
      mockDb.rescheduleAppointment(rescheduleId, rescheduleDate, rescheduleTime, user!.name);
      setRescheduleId(''); setRescheduleTime('');
    } catch { window.alert('That slot is no longer available. Choose another date or time.'); }
  }

  const statusOptions = [
    { value: 'ALL', label: 'All Statuses' }, { value: 'BOOKED', label: 'Booked' },
    { value: 'CONFIRMED', label: 'Confirmed' }, { value: 'CHECKED_IN', label: 'Checked In' },
    { value: 'WAITING', label: 'Waiting' }, { value: 'IN_CONSULTATION', label: 'In Consultation' },
    { value: 'COMPLETED', label: 'Completed' }, { value: 'CANCELLED', label: 'Cancelled' },
    { value: 'RESCHEDULED', label: 'Rescheduled' },
  ];

  return (
    <main className="reception-page page-content">
      <div className="dashboard-header"><div className="container dashboard-header__inner"><div><h1 className="text-h2">Reception Desk</h1><p className="dashboard-header__date">Today's and upcoming appointments · {format(startOfToday(), 'EEEE, MMMM d, yyyy')}</p></div><div className="dashboard-header__user"><span className="text-body-sm">Welcome, <strong>{user.name}</strong></span></div></div></div>
      <div className="container reception-content">
        <div className="reception-controls"><div className="reception-search"><Input placeholder="Search patient name, phone, or ID..." value={searchQuery} onChange={event => setSearchQuery(event.target.value)} prefix={<Search size={16} />} /></div><div className="reception-filter"><Select options={statusOptions} value={statusFilter} onChange={event => setStatusFilter(event.target.value)} /></div></div>
        <div className="reception-queue"><table className="queue-table">
          <thead><tr><th>Date / Time</th><th>Patient</th><th>Contact</th><th>Doctor</th><th>Status</th><th>Token</th><th>Slot capacity</th><th className="queue-table__actions">Actions</th></tr></thead>
          <tbody>{filteredAppointments.length ? filteredAppointments.map(appointment => {
            const doctor = mockDb.getDoctorById(appointment.doctorId);
            const slot = doctor && getGeneratedSlots(doctor.schedules, appointments, appointment.date, doctor.id).find(item => item.startTime === appointment.time);
            return <Fragment key={appointment.id}>
              <tr>
                <td><strong>{format(new Date(`${appointment.date}T12:00:00`), 'MMM d, yyyy')}</strong><br />{formatTime(appointment.time)}–{formatTime(appointment.endTime || appointment.time)}</td>
                <td><div className="queue-patient"><strong>{appointment.patientName}</strong><span className="queue-id">{appointment.id}</span></div></td><td>{appointment.patientPhone}</td><td>{doctor?.name}</td><td><StatusBadge status={appointment.status} /></td>
                <td>{appointment.tokenNumber ? <span className="queue-token">{String(appointment.tokenNumber).padStart(2, '0')}</span> : <span className="text-secondary">—</span>}</td><td>{slot ? `${slot.remaining} / ${slot.capacity} spots left` : '—'}</td>
                <td className="queue-table__actions">
                  {canTransition(appointment.status, 'CONFIRMED') && <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(appointment.id, 'CONFIRMED')}><Check size={14} /> Confirm</Button>}
                  {canTransition(appointment.status, 'CHECKED_IN') && <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(appointment.id, 'CHECKED_IN')}><UserCheck size={14} /> Check In</Button>}
                  {canTransition(appointment.status, 'WAITING') && <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(appointment.id, 'WAITING')}>Mark Waiting</Button>}
                  {canTransition(appointment.status, 'RESCHEDULED') && <Button size="sm" variant="outline" onClick={() => { setRescheduleId(rescheduleId === appointment.id ? '' : appointment.id); setRescheduleDate(nextScheduledDate(appointment.doctorId, appointment.date)); setRescheduleTime(''); }}><CalendarClock size={14} /> Reschedule</Button>}
                  {canTransition(appointment.status, 'CANCELLED') && <Button size="sm" variant="danger" onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')}><X size={14} /> Cancel</Button>}
                </td>
              </tr>
              {rescheduleId === appointment.id && <tr key={`${appointment.id}-reschedule`}><td colSpan={8}><form className="queue-reschedule-form" onSubmit={saveReschedule}>
                <Input type="date" label="New appointment date" min={todayStr} value={rescheduleDate} onChange={event => { setRescheduleDate(event.target.value); setRescheduleTime(''); }} required />
                <Select label="New time slot" options={rescheduleSlots.map(time => ({ value: time, label: formatTime(time) }))} placeholder="Choose available time" value={rescheduleTime} onChange={event => setRescheduleTime(event.target.value)} required />
                <Button type="submit" size="sm" variant="primary" disabled={!rescheduleTime}>Save new appointment</Button>
                <Button type="button" size="sm" variant="outline" onClick={() => setRescheduleId('')}>Close</Button>
                <p className="text-caption text-secondary">The original record will be marked Rescheduled and a new appointment ID will be created.</p>
              </form></td></tr>}
            </Fragment>;
          }) : <tr><td colSpan={8} className="queue-empty">No upcoming appointments found matching your criteria.</td></tr>}</tbody>
        </table></div>
      </div>
    </main>
  );
}
