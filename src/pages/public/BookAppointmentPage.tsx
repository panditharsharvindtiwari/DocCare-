import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, User, FileText, CheckCircle } from 'lucide-react';
import { format, addDays, startOfToday, parseISO } from 'date-fns';
import { mockDb } from '../../data/mockDb';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getGeneratedSlots, getScheduleForDate } from '../../utils/slotUtils';
import { DoctorAvatar } from '../../components/doctor/DoctorAvatar';
import { TimeSlot } from '../../components/appointment/TimeSlot';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { ErrorState } from '../../components/ui/States';
import './BookAppointmentPage.css';

export function BookAppointmentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const doctor = mockDb.getDoctorById(id || '');
  const allAppointments = mockDb.getAppointments();

  const todayStr = format(startOfToday(), 'yyyy-MM-dd');
  const maxDateStr = format(addDays(startOfToday(), 30), 'yyyy-MM-dd');

  // Form State
const [selectedDate, setSelectedDate] = useState(() => {
    if (!doctor) return todayStr;
    for (let offset = 1; offset <= 30; offset++) {
      const candidate = format(addDays(startOfToday(), offset), 'yyyy-MM-dd');
      if (doctor.schedules.some(schedule => schedule.active && schedule.dayOfWeek === new Date(`${candidate}T12:00:00`).getDay())) return candidate;
    }
    return todayStr;
  });
  const [selectedTime, setSelectedTime] = useState('');
  const patientUser = user?.role === 'patient' ? user : null;
  const [patientName, setPatientName] = useState(patientUser?.name || '');
  const [patientPhone, setPatientPhone] = useState(() => mockDb.getPatientById(patientUser?.userId || '')?.phone || '');
  const [appointmentType, setAppointmentType] = useState('FIRST_VISIT');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newAppointmentId, setNewAppointmentId] = useState('');

  const selectedSchedule = doctor ? getScheduleForDate(doctor.schedules, selectedDate, doctor.id) : undefined;
  const availableSlots = useMemo(() => {
    if (!doctor) return [];
    return getGeneratedSlots(doctor.schedules, allAppointments, selectedDate, doctor.id);
  }, [doctor, allAppointments, selectedDate]);

  if (!doctor) {
    return (
      <main className="page-content">
        <ErrorState
          title="Doctor not found"
          description="The doctor you are trying to book with could not be found."
          action={<Button onClick={() => navigate('/find-doctor')}>Find a Doctor</Button>}
        />
      </main>
    );
  }

  const breakStart = selectedSchedule?.breakStartTime;
  const morningSlots = availableSlots.filter(slot => slot.startTime < (breakStart || '12:00'));
  const afternoonSlots = availableSlots.filter(slot => slot.startTime >= (breakStart || '12:00'));

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset time when date changes
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !patientName.trim() || !patientPhone.trim()) {
      showToast('Please fill in all required fields and select a time slot.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      const patientId = patientUser?.userId || 'pat-guest';
      
      const appointment = mockDb.createAppointment({
        patientId,
        patientName,
        patientPhone,
        doctorId: doctor!.id,
        date: selectedDate,
        time: selectedTime,
        reason,
        appointmentType: appointmentType as 'FIRST_VISIT' | 'FOLLOW_UP',
      });

      setNewAppointmentId(appointment.id);
      setIsSuccess(true);
      showToast('Appointment booked successfully!', 'success');
      
    } catch (err: any) {
      if (err instanceof Error && ['SLOT_TAKEN', 'SLOT_UNAVAILABLE'].includes(err.message)) {
        showToast('This slot is unavailable or has just been booked. Please select another time.', 'error');
        setSelectedTime('');
      } else {
        showToast('Failed to book appointment. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <main className="book-page page-content">
        <div className="container">
          <div className="book-success">
            <CheckCircle size={64} className="book-success__icon" />
            <h1 className="text-h1">Booking Confirmed!</h1>
            <p className="book-success__desc">
              Your appointment with {doctor.name} has been successfully booked.
            </p>
            
            <div className="book-success__card">
              <p className="text-label">Appointment ID</p>
              <p className="text-h2 book-success__id">{newAppointmentId}</p>
              <p className="text-caption" style={{ marginTop: 'var(--space-2)' }}>
                Please keep this ID safe. You will need it to track your appointment status.
              </p>
            </div>

            <div className="book-success__actions">
              <Link to={`/track?id=${newAppointmentId}&phone=${patientPhone}`}>
                <Button variant="primary" size="lg">Track Appointment</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">Return to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="book-page page-content">
      <header className="book-header">
        <div className="container">
          <Link to={`/doctor/${doctor.id}`} className="book-header__back">
            <ArrowLeft size={16} /> Back to Doctor Profile
          </Link>
          <h1 className="text-h2">Book Appointment</h1>
        </div>
      </header>

      <div className="container book-layout">
        {/* Left Column - Doctor Info & Form */}
        <div className="book-main">
          <div className="book-doctor-info">
            <DoctorAvatar name={doctor.name} photoUrl={doctor.photoUrl} size="lg" />
            <div>
              <h2 className="text-h3">{doctor.name}</h2>
              <p className="text-body-sm text-secondary">{doctor.designation}</p>
              <p className="text-caption text-secondary" style={{ marginTop: 'var(--space-1)' }}>
                {doctor.hospital}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="book-form">
            <div className="book-section">
              <h3 className="book-section__title"><CalendarIcon size={18} /> Select Date & Time</h3>
              <p className="text-caption text-secondary" role="note">Prototype slots follow the demo schedule and local bookings; they are not confirmed appointments with the listed hospital.</p>
              
              <div className="book-date-picker">
                <Input
                  type="date"
                  label="Appointment Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={todayStr}
                  max={maxDateStr}
                  required
                />
              </div>

              <div className="book-time-slots">
                <div className="book-slots-heading"><span className="input-label">Available appointments for</span><strong>{format(parseISO(selectedDate), 'EEEE, MMMM d')}</strong></div>
                
                {selectedSchedule && <p className="book-schedule-meta">Working hours {selectedSchedule.startTime} – {selectedSchedule.endTime} · {selectedSchedule.slotDuration} minute slots</p>}
                {availableSlots.length > 0 ? (
                  <>
                    {morningSlots.length > 0 && <section className="book-slot-period" aria-label="Morning appointment slots"><h4>Morning</h4><div className="book-slots-grid">{morningSlots.map(slot => <TimeSlot key={slot.startTime} time={slot.startTime} endTime={slot.endTime} remaining={slot.remaining} status={slot.status} selected={selectedTime === slot.startTime} onSelect={setSelectedTime} />)}</div></section>}
                    {selectedSchedule?.breakStartTime && selectedSchedule.breakEndTime && <div className="book-break-note" role="note"><strong>{selectedSchedule.breakReason || 'Lunch Break'}</strong><span>{selectedSchedule.breakStartTime} – {selectedSchedule.breakEndTime}</span></div>}
                    {afternoonSlots.length > 0 && <section className="book-slot-period" aria-label="Afternoon appointment slots"><h4>Afternoon</h4><div className="book-slots-grid">{afternoonSlots.map(slot => <TimeSlot key={slot.startTime} time={slot.startTime} endTime={slot.endTime} remaining={slot.remaining} status={slot.status} selected={selectedTime === slot.startTime} onSelect={setSelectedTime} />)}</div></section>}
                  </>
                ) : (
                  <div className="book-slots-empty">No scheduled slots on this date. Choose a working day for this doctor.</div>
                )}
              </div>
            </div>

            <div className="book-section">
              <h3 className="book-section__title"><User size={18} /> Patient Details</h3>
              
              <div className="book-form-grid">
                <Input
                  label="Full Name"
                  placeholder="Enter patient's full name"
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  required
                />
                <Input
                  label="Mobile Number"
                  placeholder="10-digit mobile number"
                  type="tel"
                  pattern="[0-9]{10}"
                  value={patientPhone}
                  onChange={e => setPatientPhone(e.target.value)}
                  hint="Used for tracking the appointment"
                  required
                />
              </div>
            </div>

            <div className="book-section">
              <h3 className="book-section__title"><FileText size={18} /> Appointment Details</h3>
              
              <div className="book-form-grid">
                <Select
                  label="Visit Type"
                  options={[
                    { value: 'FIRST_VISIT', label: 'First Visit' },
                    { value: 'FOLLOW_UP', label: 'Follow Up' }
                  ]}
                  value={appointmentType}
                  onChange={e => setAppointmentType(e.target.value)}
                  required
                />
              </div>
              
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Input
                  label="Reason for Visit (Optional)"
                  placeholder="Briefly describe your symptoms or reason for visit"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>
            </div>

            <div className="book-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={!selectedTime}
              >
                Confirm Appointment
              </Button>
              {!selectedTime && (
                <p className="book-error-hint">Please select a time slot to continue.</p>
              )}
            </div>
          </form>
        </div>

        {/* Right Column - Summary */}
        <aside className="book-sidebar">
          <div className="book-summary-card">
            <h3 className="text-h4 book-summary-card__title">Booking Summary</h3>
            
            <dl className="book-summary-details">
              <div className="book-summary-details__row">
                <dt>Doctor</dt>
                <dd>{doctor.name}</dd>
              </div>
              <div className="book-summary-details__row">
                <dt>Location</dt>
                <dd>{doctor.hospital}</dd>
              </div>
              
              <hr className="divider" />
              
              <div className="book-summary-details__row">
                <dt>Date</dt>
                <dd>{format(parseISO(selectedDate), 'EEEE, MMMM d, yyyy')}</dd>
              </div>
              <div className="book-summary-details__row">
                <dt>Time</dt>
                <dd>
                  {selectedTime ? (
                    <span className="text-accent">
                      {format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')} – {format(new Date(`2000-01-01T${availableSlots.find(slot => slot.startTime === selectedTime)?.endTime || selectedTime}`), 'h:mm a')}
                    </span>
                  ) : (
                    <span className="text-secondary">Not selected</span>
                  )}
                </dd>
              </div>
            </dl>
            {selectedTime && <div className="book-selected-summary" role="status"><strong>Selected appointment</strong><span>{doctor.name}</span><span>{format(parseISO(selectedDate), 'EEEE, MMMM d')}</span><span>{format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')} – {format(new Date(`2000-01-01T${availableSlots.find(slot => slot.startTime === selectedTime)?.endTime || selectedTime}`), 'h:mm a')}</span><span>{availableSlots.find(slot => slot.startTime === selectedTime)?.remaining} {availableSlots.find(slot => slot.startTime === selectedTime)?.remaining === 1 ? 'spot' : 'spots'} remaining</span></div>}
          </div>
        </aside>
      </div>
    </main>
  );
}



