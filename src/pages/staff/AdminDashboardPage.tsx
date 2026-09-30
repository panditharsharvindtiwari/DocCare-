import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockDb } from '../../data/mockDb';
import { useMockDbVersion } from '../../hooks/useMockDbVersion';
import { Database, Users, Calendar, Activity, Settings } from 'lucide-react';
import { format, startOfToday } from 'date-fns';
import { DoctorSchedule } from '../../types/doctor';
import { Button } from '../../components/ui/Button';
import './AdminDashboardPage.css';

const weekdays = [{day:1,label:'Mon'},{day:2,label:'Tue'},{day:3,label:'Wed'},{day:4,label:'Thu'},{day:5,label:'Fri'},{day:6,label:'Sat'},{day:0,label:'Sun'}] as const;

export function AdminDashboardPage() {
  const { user } = useAuth();
  useMockDbVersion();
  const doctors = mockDb.getDoctors();
  const appointments = mockDb.getAppointments();
  const todayStr = format(startOfToday(), 'yyyy-MM-dd');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const initialSchedule = doctors.find(doctor => doctor.id === selectedDoctorId)?.schedules[0];
  const [days, setDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [startTime, setStartTime] = useState(initialSchedule?.startTime || '10:00');
  const [endTime, setEndTime] = useState(initialSchedule?.endTime || '17:00');
  const [breakStart, setBreakStart] = useState(initialSchedule?.breakStartTime || '13:00');
  const [breakEnd, setBreakEnd] = useState(initialSchedule?.breakEndTime || '14:00');
  const [duration, setDuration] = useState<20 | 30 | 60>(30);
  const [capacity, setCapacity] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [message, setMessage] = useState('');
  const selectedDoctor = doctors.find(doctor => doctor.id === selectedDoctorId);

  const stats = {
    totalDoctors: doctors.length,
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter(appointment => appointment.date === todayStr).length,
    upcomingAppointments: appointments.filter(appointment => appointment.date > todayStr && !['CANCELLED', 'RESCHEDULED', 'COMPLETED'].includes(appointment.status)).length,
    byStatus: appointments.reduce<Record<string, number>>((counts, appointment) => { counts[appointment.status] = (counts[appointment.status] || 0) + 1; return counts; }, {}),
  };

  if (!user || user.role !== 'admin') return <Navigate to="/staff/login" replace />;

  function saveSchedule(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedDoctorId || days.length === 0) { setMessage('Choose a doctor and at least one working day.'); return; }
    const schedules: DoctorSchedule[] = days.map(day => ({
      id: `admin-${selectedDoctorId}-${day}`, doctorId: selectedDoctorId, dayOfWeek: day as DoctorSchedule['dayOfWeek'], startTime, endTime,
      breakStartTime: breakStart, breakEndTime: breakEnd, breakReason: 'Lunch Break', slotDuration: duration, slotCapacity: capacity, active: true,
    }));
    try { mockDb.setDoctorSchedules(selectedDoctorId, schedules); setMessage(`Saved schedule for ${selectedDoctor?.name}.`); }
    catch { setMessage('Schedule could not be saved. Check the selected values.'); }
  }

  return (
    <main className="admin-page page-content">
      <div className="dashboard-header" style={{ backgroundColor: 'var(--color-bg-white)', padding: 'var(--space-6) 0', borderBottom: '1px solid var(--color-border)' }}><div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}><div><h1 className="text-h2">System Administration</h1><p className="text-body-sm text-secondary" style={{ marginTop: 'var(--space-1)' }}>Mock database overview · Welcome, <strong>{user.name}</strong></p></div></div></div>
      <div className="container admin-content">
        <div className="admin-stats-grid">
          {[
            { title: 'Total Doctors', value: stats.totalDoctors, Icon: Users },
            { title: 'All Appointments', value: stats.totalAppointments, Icon: Database },
            { title: "Today's Appointments", value: stats.todayAppointments, Icon: Calendar },
            { title: 'Upcoming Appointments', value: stats.upcomingAppointments, Icon: Activity },
          ].map(({ title, value, Icon }) => <section className="admin-stat-card" key={title}><div><Icon size={20} /><span className="text-label">{title}</span></div><p className="text-display">{value}</p></section>)}
        </div>
        <div className="admin-panels">
          <section className="admin-panel"><h2 className="text-h4">Appointments by status</h2><ul className="admin-status-list">{['BOOKED','CONFIRMED','CHECKED_IN','WAITING','IN_CONSULTATION','COMPLETED','CANCELLED','RESCHEDULED'].map(status => <li key={status}><span>{status.replaceAll('_',' ')}</span><strong>{stats.byStatus[status] || 0}</strong></li>)}</ul></section>
          <section className="admin-panel"><h2 className="text-h4"><Settings size={18} /> Demo doctor schedules</h2><p className="text-caption text-secondary">Schedules control prototype slots only and do not represent hospital calendars.</p>
            <form className="admin-schedule-form" onSubmit={saveSchedule}>
              <label className="input-label">Doctor<select className="admin-native-select" value={selectedDoctorId} onChange={event => setSelectedDoctorId(event.target.value)}>{doctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.name} · {doctor.designation}</option>)}</select></label>
              <fieldset className="admin-days"><legend className="input-label">Working days</legend>{weekdays.map(item => <label key={item.day}><input type="checkbox" checked={days.includes(item.day)} onChange={event => setDays(current => event.target.checked ? [...current, item.day] : current.filter(day => day !== item.day))} /> {item.label}</label>)}</fieldset>
              <div className="admin-time-grid"><label className="input-label">Start<input type="time" value={startTime} onChange={event => setStartTime(event.target.value)} required /></label><label className="input-label">End<input type="time" value={endTime} onChange={event => setEndTime(event.target.value)} required /></label><label className="input-label">Break starts<input type="time" value={breakStart} onChange={event => setBreakStart(event.target.value)} /></label><label className="input-label">Break ends<input type="time" value={breakEnd} onChange={event => setBreakEnd(event.target.value)} /></label></div>
              <div className="admin-time-grid"><label className="input-label">Slot duration<select className="admin-native-select" value={duration} onChange={event => setDuration(Number(event.target.value) as 20 | 30 | 60)}><option value={20}>20 minutes</option><option value={30}>30 minutes</option><option value={60}>60 minutes</option></select></label><label className="input-label">Patients per slot<select className="admin-native-select" value={capacity} onChange={event => setCapacity(Number(event.target.value) as 1 | 2 | 3 | 4 | 5)}>{[1,2,3,4,5].map(value => <option key={value} value={value}>{value}</option>)}</select></label></div>
              <Button type="submit" variant="primary">Save schedule</Button>{message && <p role="status" className="text-caption">{message}</p>}
            </form>
          </section>
        </div>
        <section className="admin-panel admin-online"><Activity size={36} /><div><h2 className="text-h4">Local prototype active</h2><p className="text-body-sm text-secondary">Appointments and schedules are stored in this browser's mock database. This phase does not connect to Supabase.</p></div></section>
      </div>
    </main>
  );
}
